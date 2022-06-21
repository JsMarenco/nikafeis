import { Request, Response, NextFunction } from "express"

import User from "../../models/User"
import Post from "../../models/Post"

import bcrypt from "bcrypt"

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId = ""
    } = req.params

    const {
      password = ""
    } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      })
    } else {
      const passwordHash = await bcrypt.compare(password, user.password)

      if (!passwordHash) {
        return res.status(400).json({
          error: "Password incorrect",
        })
      } else {
        // delete users posts
        await Post.deleteMany({ userId: user.id })

        // delete comments on users posts
        await Post.updateMany(
          { userId: user.id },
          { $unset: { comments: "" } }
        )

        // delete user
        await User.findByIdAndDelete(userId)

        return res.status(200).json({
          message: "User deleted",
        })
      }
    }
  }
  catch (error) {
    console.log(`Error in deleteUser: ${error}`)

    next(error)
  }
}

export default deleteUser