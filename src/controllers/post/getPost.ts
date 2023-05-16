// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"
import { IPost } from "@/ts/interfaces/post"
import { userProjection } from "@/ts/interfaces/user"

export const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId = "" } = req.query

    if (!postId) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    const post: IPost | null = await Post.findById(postId)

    if (!post) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.post.postNotFound,
      })
    }

    const thePost = await Post.findById(post.id)
      .populate({
        path: "author",
        select: userProjection,
      })
      .populate({
        path: "likes",
        select: userProjection,
      })
      .populate({
        path: "shares",
        select: userProjection,
      })

    res.status(httpStatus.ok.code).json(thePost)
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

export default getPost
