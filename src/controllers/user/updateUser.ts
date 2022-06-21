import { Request, Response, NextFunction } from "express"

import bcrypt from "bcrypt"

import User from "../../models/User"

import uploadImageToCloudinary from "../../cloudinary"

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId = ""
    } = req.params

    const user = await User.findById(userId)

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      })
    } else {
      const {
        name = "",
        lastName = "",
        description = "",
        cover = "",
        website = "",
        privateAccount = "",
        username = "",
        password = ""
      } = req.body

      // find user by username
      const userByUsername = await User.findOne({ username })

      if (userByUsername) {
        res.status(400).json({
          error: "Username is not available",
        })
      } else {
        // check if the passowrd is correct
        const passwordHash = await bcrypt.compare(password, user.password)

        if (!passwordHash) {
          return res.status(400).json({
            error: "Password is incorrect",
          })
        }

        const localImageUrl = req.file?.path as string

        let imageSaved = ""
    
        if (localImageUrl) {
          imageSaved = await uploadImageToCloudinary(localImageUrl)
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
          name: name || user.name,
          lastName: lastName || user.lastName,
          description: description || user.description,
          avatar: imageSaved || user.avatar,
          cover: cover || user.cover,
          website: website || user.website,
          privateAccount: privateAccount || user.privateAccount,
          username: username || user.username,
        }, { new: true })

        return res.status(200).json(updatedUser)
      }
    }
  }
  catch (error) {
    console.log(`Error in updateUser: ${error}`)

    next(error)
  }
}

export default updateUser