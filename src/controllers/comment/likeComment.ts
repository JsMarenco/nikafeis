// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import connectWithRetry from "@/database"
import Comment from "@/models/Comment"
import User from "@/models/User"
import { IUser } from "@/ts/interfaces/user"
import { IComment } from "@/ts/interfaces/comment"

const likeComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { commentId = "", userId = "" } = req.query

    if (!userId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findById(userId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const comment: HydratedDocument<IComment> | null = await Comment.findById(
      commentId
    )

    if (!comment) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.comment.notFound,
      })
    }

    if (comment.likes.includes(userId as string)) {
      // User already liked the comment, so remove the like

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      ).lean()

      res.status(httpStatus.ok.code).json({
        comment: updatedComment,
        message: apiMessages.success.comment.unliked,
      })
    } else {
      // User has not liked the comment, so add the like

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $push: { likes: userId } },
        { new: true }
      ).lean()

      res.status(httpStatus.ok.code).json({
        comment: updatedComment,
        message: apiMessages.success.comment.liked,
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

export default likeComment
