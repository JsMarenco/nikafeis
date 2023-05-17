// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import { IUser, userProjection } from "@/ts/interfaces/user"
import FriendRequest from "@/models/FriendRequests"

const getFriendRequestsByUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, offset, limit } = req.query

    const offsetValue = parseInt(offset as string)
    const limitValue = parseInt(limit as string)

    if (isNaN(offsetValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    if (isNaN(limitValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    if (!userId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    const user: HydratedDocument<IUser> | null = await User.findById(userId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const userRequests = await FriendRequest.find({ to: userId })
      .populate({
        path: "to",
        select: userProjection,
      })
      .populate({
        path: "from",
        select: userProjection,
      })
      .limit(offsetValue)
      .skip(limitValue)

    res.status(httpStatus.ok.code).json(userRequests)
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

export default getFriendRequestsByUserId
