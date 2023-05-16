// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"
import User from "@/models/User"
import { IPost } from "@/ts/interfaces/post"
import { HydratedDocument } from "mongoose"
import { IUser } from "@/ts/interfaces/user"

const updateLikes = async (
  postId: string,
  userId: string,
  isLiked: boolean
) => {
  const updateQuery = isLiked
    ? { $pull: { likes: userId } }
    : { $push: { likes: userId } }

  const updatedPost: HydratedDocument<IPost> | null =
    await Post.findByIdAndUpdate(postId, updateQuery, { new: true, lean: true })

  return updatedPost
}

const likePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId = "", userId = "" } = req.query

    if (!postId || !userId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    const user: HydratedDocument<IUser> | null = await User.findById(userId)
    const post: HydratedDocument<IPost> | null = await Post.findById(postId)

    if (!post) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.post.postNotFound,
      })
    }

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    // TODO: Add token validation

    const liked = post.likes.includes(user.id)

    const updatedPost = await updateLikes(post.id, user.id, liked)

    const message = liked
      ? apiMessages.success.post.unliked
      : apiMessages.success.post.liked

    return res.status(httpStatus.ok.code).json({
      post: updatedPost,
      message,
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

export default likePost
