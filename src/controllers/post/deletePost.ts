// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import User from "@/models/User"
import { IUser } from "@/ts/interfaces/user"
import { IPost } from "@/ts/interfaces/post"
import Post from "@/models/Post"

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId = "" } = req.query

    if (!postId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    const post: HydratedDocument<IPost> | null = await Post.findById(postId)

    if (!post) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.post.postNotFound,
      })
    }

    const postAuthor: HydratedDocument<IUser> | null = await User.findById(
      post.author
    )

    // TODO: Add token validation

    if (postAuthor) {
      postAuthor.posts = postAuthor.posts.filter(
        (p: { toString: () => string }) => p.toString() !== postId
      )
      await postAuthor.save()
    }

    await Post.findByIdAndDelete(post.id)

    return res.status(httpStatus.ok.code).json({
      message: apiMessages.success.post.deleted,
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

export default deletePost
