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

    if (senderIdValue === receiverIdValue) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.selfFriendRequest,
      })
    }

    await connectWithRetry()

    /**
     * Retrieves the sender and receiver documents based on their IDs.
     * @param {string} senderIdValue - The ID of the sender.
     * @param {string} receiverIdValue - The ID of the receiver.
     * @returns {Promise<[HydratedDocument<IUser> | null, HydratedDocument<IUser> | null]>}
     * A Promise that resolves to an array containing the sender and receiver documents, or null if not found.
     */
    const [sender, receiver]: [
      HydratedDocument<IUser> | null,
      HydratedDocument<IUser> | null
    ] = await Promise.all([
      User.findById(senderIdValue),
      User.findById(receiverIdValue),
    ])

    if (!sender || !receiver) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    // Check if the users are already friends
    const isFriend: HydratedDocument<IUser> | null = await User.findOne({
      _id: sender.id,
      friends: { $in: [receiver.id] },
    })

    if (isFriend) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.alreadyFriends,
      })
    }

    const existingFriendRequest = await FriendRequest.findOne({
      $or: [
        { from: sender.id, to: receiver.id },
        { from: receiver.id, to: sender.id },
      ],
    })

    if (existingFriendRequest) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendRequest.requestAlreadySent,
      })
    }

    const friendRequest: HydratedDocument<IFriendRequest> =
      await new FriendRequest({ from: sender.id, to: receiver.id })

    await friendRequest.save()

    await User.findByIdAndUpdate(senderId, {
      $push: { friendRequestsSent: friendRequest.id },
    })

    await User.findByIdAndUpdate(receiverId, {
      $push: { friendRequests: friendRequest.id },
    })

    const senderFriendRequestsSent: HydratedDocument<IUser> | null =
      await User.findById(senderId)

    if (senderFriendRequestsSent) {
      return res.status(httpStatus.created.code).json({
        friendRequestsSent: senderFriendRequestsSent.friendRequestsSent,
        message: apiMessages.success.friendRequest.sent,
      })
    }
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(httpStatus.badRequest.code).send({
        message: apiMessages.errors.authentication.invalidId,
      })
    } else {
      return res.status(httpStatus.serverError.code).json({
        message: httpStatus.serverError.message,
      })
    }
  }
}

export default sendFriendRequest
