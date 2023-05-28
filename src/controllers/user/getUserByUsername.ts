// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import { IUser } from "@/ts/interfaces/user"
import apiMessages from "@/constants/api/messages"

const getUserByUsername = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username = "" } = req.query

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

    return res.status(httpStatus.ok.code).json(user)
  } catch (error) {
    console.log(
      "🚀 ~ file: getUserByUsername.ts:36 ~ getUserByUsername ~ error:",
      error
    )

    return res.status(httpStatus.badRequest.code).json({
      message: error,
    })
  }
}

export default getUserByUsername
