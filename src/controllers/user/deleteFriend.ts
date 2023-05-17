// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import { IUser } from "@/ts/interfaces/user"
import apiMessages from "@/constants/api/messages"

const deleteFriend = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, friendId } = req.query

    if (!userId || !friendId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    // TODO: Add token validation

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findById(userId)
    const userFriend: HydratedDocument<IUser> | null = await User.findById(
      friendId
    )

    if (!user || !userFriend) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const isFriend = await User.findOne({
      _id: user._id,
      friends: { $all: [userFriend.id] },
    })

    if (!isFriend) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.friendship.notYourFriend,
      })
    }

    const userUpdated = await User.findByIdAndUpdate(
      user.id,
      {
        $pull: {
          friends: {
            $in: [userFriend.id],
          },
        },
      },
      { new: true }
    ).lean()

    await User.findByIdAndUpdate(userFriend.id, {
      $pull: {
        friends: {
          $in: [user.id],
        },
      },
    })

    res.status(httpStatus.ok.code).json({
      friends: userUpdated,
      message: apiMessages.success.friendship.removedFromFriendList,
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

export default deleteFriend
