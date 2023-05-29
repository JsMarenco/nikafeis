// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import { IUser, userProjection } from "@/ts/interfaces/user"
import apiMessages from "@/constants/api/messages"
import Post from "@/models/Post"

const getUserPostsByUsername = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { username = "", offset = "", limit = "" } = req.query

    if (username === "") {
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

    const user: HydratedDocument<IUser> | null = await User.findOne({
      username,
    })

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    const posts = await Post.find({ author: user.id })
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
    console.log("🚀 ~ file: getUserPostByUsername.ts:87 ~ error:", error)
    res.status(httpStatus.badRequest.code).json({
      message: error,
    })
  }
}

export default getUserPostsByUsername
