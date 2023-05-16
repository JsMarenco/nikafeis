// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import { userProjection } from "@/ts/interfaces/user"
import Post from "@/models/Post"

const getRecentPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { offset = "", limit = "" } = req.query

    const offsetValue = parseInt(offset as string)
    const limitValue = parseInt(limit as string)

    if (isNaN(offsetValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    if (isNaN(limitValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    const posts = await Post.find()
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
      .limit(limitValue)
      .skip(offsetValue)

    res.status(httpStatus.ok.code).json(posts)
  } catch (error) {
    res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}

export default getRecentPosts
