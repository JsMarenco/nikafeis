// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import mongoose, { HydratedDocument } from "mongoose"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"
import connectWithRetry from "@/database"
import User from "@/models/User"
import { IComment } from "@/ts/interfaces/comment"
import Comment from "@/models/Comment"
import { IPost } from "@/ts/interfaces/post"
import { IUser } from "@/ts/interfaces/user"

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body))
    const { content = "" } = data
    const { postId = "", userId = "" } = req.query

    if (!postId || !content || !userId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    await connectWithRetry()

    const post: HydratedDocument<IPost> | null = await Post.findById(postId)

    if (!post) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.post.postNotFound,
      })
    }

    const user: HydratedDocument<IUser> | null = await User.findById(userId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    // Create the comment
    const comment: HydratedDocument<IComment> = new Comment({
      content,
      author: user.id,
      post: post.id,
    })

    // Save the comment to the database
    await comment.save()

    await Post.updateOne({ _id: post.id }, { $push: { comments: comment.id } })

    res.status(httpStatus.created.code).json({
      comment,
      message: apiMessages.success.comment.created,
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
  } finally {
    mongoose.disconnect()
  }
}

export default createComment
