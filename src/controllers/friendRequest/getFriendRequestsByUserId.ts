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
      .limit(limitValue)
      .skip(offsetValue)

    if (userRequests) {
      const FriendRequestLength = await FriendRequest.countDocuments({
        to: userId,
      })

      const hasNextPage = offsetValue + limitValue < FriendRequestLength

      return res.status(httpStatus.ok.code).json({
        friendRequest: userRequests,
        hasNextPage,
      })
    }
  } catch (error: any) {
    console.log(
      "🚀 ~ file: getFriendRequestsByUserId.ts:61 ~ error: any:",
      error
    )

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
