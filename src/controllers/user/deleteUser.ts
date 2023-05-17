// Third-party dependencies
import bcrypt from "bcrypt"
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import { IUser } from "@/ts/interfaces/user"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId = "" } = req.query
    const { password = "" } = req.body

    if (!userId || !password) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    // TODO: Add token validation

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findById(
      userId
    ).select("+password")

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const passwordHash =
      user === null ? false : await bcrypt.compare(password, user.password)

    if (!user || !passwordHash) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidCredentials,
      })
    }

    // delete users posts
    await Post.deleteMany({ userId: user.id })

    // delete comments on users posts
    await Post.updateMany({ userId: user.id }, { $unset: { comments: "" } })

    // delete user
    await User.findByIdAndDelete(userId)

    return res.status(httpStatus.ok.code).json({
      message: apiMessages.success.user.deleted,
    })
  } catch (error: any) {
    switch (error.name) {
      case "CastError":
        res.status(httpStatus.badRequest.code).send({
          message: apiMessages.errors.authentication.invalidId,
        })
        break

      default:
        res.status(httpStatus.serverError.code).json({
          message: httpStatus.serverError.message,
        })
        break
    }
  }
}

export default deleteUser
