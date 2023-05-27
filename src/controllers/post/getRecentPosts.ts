// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import { userProjection } from "@/ts/interfaces/user"
import Post from "@/models/Post"
import connectWithRetry from "@/database"

const getRecentPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { offset = "", limit = "" } = req.query

    if (offset === "" || limit === "") {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.limitOffset,
      })
    }

    const offsetValue = parseInt(offset as string)
    const limitValue = parseInt(limit as string)

    if (isNaN(offsetValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    if (isNaN(limitValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.limitMustBeNumber,
      })
    }

    await connectWithRetry()

    const posts = await Post.find()
      .populate({
        path: "author",
        select: userProjection,
      })
      .limit(limitValue)
      .skip(offsetValue)

    const postsLength = await Post.countDocuments()

    const hasNextPage = offsetValue + limitValue < postsLength

    return res.status(httpStatus.ok.code).json({
      posts: posts.reverse(),
      hasNextPage,
    })
  } catch (error) {
    console.log(
      "🚀 ~ file: getRecentPosts.ts:56 ~ getRecentPosts ~ error:",
      error
    )
    return res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}

export default getRecentPosts
