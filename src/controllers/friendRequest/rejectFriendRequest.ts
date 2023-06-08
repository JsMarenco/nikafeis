// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import { IUser } from "@/ts/interfaces/user"
import FriendRequest from "@/models/FriendRequests"
import { IFriendRequest } from "@/ts/interfaces/friendRequest"
import connectWithRetry from "@/database"

const rejectFriendRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { receiverId, requestId } = req.query

    if (!receiverId || !requestId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findById(receiverId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const friendRequest: HydratedDocument<IFriendRequest> | null =
      await FriendRequest.findById(requestId)

    if (!friendRequest) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.friendRequest.friendRequestNotFound,
      })
    }

    if (friendRequest.from === user.id) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.cannotRejectOwnRequest,
      })
    }

    await friendRequest.deleteOne()

    await User.updateOne(
      { _id: friendRequest.from },
      { $pull: { friendRequestsSent: friendRequest.id } }
    )
    await User.updateOne(
      { _id: friendRequest.to },
      { $pull: { friendRequests: friendRequest.id } }
    )

    const userFriendRequests: HydratedDocument<IUser> | null =
      await User.findById(user.id).lean()

    if (userFriendRequests) {
      return res.status(httpStatus.ok.code).json({
        friendRequests: userFriendRequests.friendRequests,
        message: apiMessages.success.friendRequest.rejected,
      })
    }
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

export default rejectFriendRequest
