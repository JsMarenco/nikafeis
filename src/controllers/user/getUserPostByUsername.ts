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

    if (!username) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
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
      .populate({
        path: "likes",
        select: userProjection,
      })
      .populate({
        path: "shares",
        select: userProjection,
      })
      .populate({
        path: "createdAt",
        select: "createdAt",
      })
      .populate({
        path: "updatedAt",
        select: "updatedAt",
      })
      .limit(limitValue)
      .skip(offsetValue)

    return res.status(httpStatus.ok.code).json(posts)
  } catch (error) {
    res.status(httpStatus.badRequest.code).json({
      message: error,
    })
  }
}

export default getUserPostsByUsername
