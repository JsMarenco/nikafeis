// Third-party dependencies
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { JwtPayload } from "jsonwebtoken"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import { decodeJWT } from "@/utils/basic"
import User from "@/models/User"
import mongoose from "mongoose"
import connectWithRetry from "@/database"

const authentication = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: NextApiHandler
) => {
  try {
    const data = JSON.parse(JSON.stringify(req.headers))
    const { Authorization = "" } = data

    const token: string = Authorization.split(" ")[1]

    if (!token) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.tokenRequired,
      })
    }

    const payload = decodeJWT(token) as JwtPayload

    const userId = payload.id

    await connectWithRetry()

    const user = await User.findById(userId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    return handler(req, res)
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
  } finally {
    mongoose.disconnect()
  }
}

export default authentication
