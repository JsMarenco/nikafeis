// Third-party dependencies
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import { IUser } from "@/ts/interfaces/user"
import apiMessages from "@/constants/api/messages"

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token = "", newPassword = "" } = req.body
    const { userId = "" } = req.query

    if (!token || !newPassword || !userId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findOne({
      _id: userId,
    })

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const secret = process.env.JWT_SECRET || "secret"
    const decoded = jwt.verify(token, secret) as JwtPayload

    if (decoded.userId !== userId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidJwtUserId,
      })
    }

    if (decoded.userEmail !== user.email) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidJwtUserEmail,
      })
    }

    // encrypt new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)

    // update user
    await User.findByIdAndUpdate(userId, {
      password: encryptedPassword,
    })

    return res.status(httpStatus.ok.code).json({
      message: apiMessages.success.user.passwordReset,
    })
  } catch (error: any) {
    switch (error.name) {
      case "JsonWebTokenError":
        res.status(httpStatus.badRequest.code).json({
          message: apiMessages.errors.authentication.invalidToken,
        })
        break

      case "CastError":
        res.status(httpStatus.badRequest.code).json({
          message: apiMessages.errors.authentication.invalidId,
        })
        break

      case "TokenExpiredError":
        res.status(httpStatus.badRequest.code).json({
          message: apiMessages.errors.authentication.jwtExpired,
        })
        break

      default:
        res.status(httpStatus.serverError.code).json({
          message: httpStatus.serverError.message,
        })
    }
  }
}

export default resetPassword
