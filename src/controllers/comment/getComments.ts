// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import mongoose, { HydratedDocument } from "mongoose"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"
import connectWithRetry from "@/database"
import Comment from "@/models/Comment"
import { IPost } from "@/ts/interfaces/post"
import { userProjection } from "@/ts/interfaces/user"

const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId = "", limit = "", offset = "" } = req.query

    if (!postId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    if (offset === "" || limit === "") {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.limitOffset,
      })
    }

    const offsetValue = parseInt(offset as string)
    const limitValue = parseInt(limit as string)

    if (isNaN(offsetValue) || offsetValue < 0) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    if (isNaN(limitValue) || limitValue < 0) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.limitMustBeNumber,
      })
    }

    await connectWithRetry()

    const post: HydratedDocument<IPost> | null = await Post.findById(postId)

    if (!post) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.post.postNotFound,
      })
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", userProjection)
      .limit(limitValue)
      .skip(offsetValue)

    res.status(httpStatus.ok.code).json(comments)
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

export default getComments
