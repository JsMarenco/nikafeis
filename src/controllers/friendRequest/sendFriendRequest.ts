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

const sendFriendRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { senderId, receiverId } = req.query

    const senderIdValue: string = senderId as string
    const receiverIdValue: string = receiverId as string

    if (!senderIdValue || !receiverIdValue) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    if (!senderIdValue || !receiverIdValue) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.selfFriendRequest,
      })
    }

    await connectWithRetry()

    const sender: HydratedDocument<IUser> | null = await User.findById(senderId)
    const receiver: HydratedDocument<IUser> | null = await User.findById(
      receiverId
    )

    if (!sender || !receiver) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    // Check if the users are already friends
    const isFriend: HydratedDocument<IUser> | null = await User.findOne({
      _id: sender.id,
      friends: { $all: [receiver.id] },
    })

    if (isFriend) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.alreadyFriends,
      })
    }

    const existingFriendRequest = await FriendRequest.findOne({
      $or: [
        { from: sender._id, to: receiver._id },
        { from: receiver._id, to: sender._id },
      ],
    })

    if (existingFriendRequest) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.requestAlreadySent,
      })
    }

    if (!existingFriendRequest) {
      const friendRequest: HydratedDocument<IFriendRequest> = new FriendRequest(
        {
          from: sender.id,
          to: receiver.id,
        }
      )

      await friendRequest.save()

      sender.friendRequestsSent.push(friendRequest.id)
      receiver.friendRequests.push(friendRequest.id)

      await sender.save()
      await receiver.save()

      const userFriendRequestSent = await User.findById(friendRequest._id)
        .lean()
        .select("friendRequestsSent")

      res.status(httpStatus.created.code).json({
        userFriendRequestSent,
        message: apiMessages.success.friendRequest.sent,
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

export default sendFriendRequest
