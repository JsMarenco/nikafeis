// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"
import { IPost } from "@/ts/interfaces/post"
import { IUser } from "@/ts/interfaces/user"
import User from "@/models/User"
import { HydratedDocument } from "mongoose"

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId = "", title = "", content = "" } = req.body

    const { postId = "" } = req.query

    if (!userId || !postId) {
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

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.post.postNotFound,
      })
    }

    if (post.author.toString() !== user.id) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.post.postNotWrittenByUser,
      })
    }

    const updatedPost: HydratedDocument<IPost> | null =
      await Post.findByIdAndUpdate(
        postId,
        {
          $set: {
            title: title || post.title,
            content: content || post.content,
            updatedAt: new Date(),
          },
        },
        { new: true, lean: true }
      )

    res.status(httpStatus.ok.code).json({
      post: updatedPost,
      message: apiMessages.success.post.updated,
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

export default updatePost
