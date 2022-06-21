import { Request, Response, NextFunction } from "express"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../../models/User"

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      token = "",
      newPassword = "",
    } = req.body

    const {
      userId = "",
    } = req.params

    if (!token || !newPassword || !userId) {
      return res.status(400).json({
        error: "Missing fields",
      })
    } else {
      const user = await User.findOne({
        _id: userId,
      })

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        })
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
          userId: string
        }

        if (decoded.userId !== userId) {
          return res.status(400).json({
            error: "Invalid token",
          })
        } else {
          // encrypt new password
          const encryptedPassword = await bcrypt.hash(newPassword, 10)

          // update user
          await User.findByIdAndUpdate(userId, {
            password: encryptedPassword,
          })

          return res.status(200).json({
            message: "Password changed successfully",
          })
        }
      }
    }
  }
  catch (error) {
    console.log(`Error in resetPassword: ${error}`)

    next(error)
  }
}

export default resetPassword