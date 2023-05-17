// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import { IUser } from "@/ts/interfaces/user"
import FriendRequest from "@/models/FriendRequests"
import { IFriendRequest } from "@/ts/interfaces/friendRequest"

const acceptFriendRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { to = "", requestId = "" } = req.query

    if (!to || !requestId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    await connectWithRetry()

    const toUser: HydratedDocument<IUser> | null = await User.findById(to)

    if (!toUser) {
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

    if (friendRequest.from.toString() === toUser.id) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.acceptOwnFriendRequest,
      })
    }

    if (friendRequest.to.toString() !== toUser.id) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.notFriendRequestReceiver,
      })
    }

    const sender: HydratedDocument<IUser> | null = await User.findById(
      friendRequest.from
    )

    if (!sender) {
      await User.updateOne(
        { _id: toUser.id },
        { $pull: { friendRequests: friendRequest.id } }
      )

      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.receiverUserNotFound,
      })
    }

    // deleting requests
    await User.updateOne(
      { _id: sender.id },
      { $pull: { friendRequestsSent: friendRequest.id } }
    )
    await User.updateOne(
      { _id: toUser.id },
      { $pull: { friendRequests: friendRequest.id } }
    )

    // add to friends array
    await User.updateOne(
      { _id: sender._id },
      { $addToSet: { friends: toUser.id } }
    )
    await User.updateOne(
      { _id: toUser.id },
      { $addToSet: { friends: sender.id } }
    )

    // deleting the friend request
    await friendRequest.deleteOne()
    const userFriends = await User.findById(toUser.id).lean().select("friends")

    res.status(httpStatus.ok.code).json({
      userFriends,
      message: apiMessages.success.friendship.nowFriends,
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

export default acceptFriendRequest
