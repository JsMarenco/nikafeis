// Third-party dependencies
import bcrypt from "bcrypt"
import type { NextApiRequest, NextApiResponse } from "next"
import mongoose, { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import {
  generateJWT,
  validateEmptyProperties,
  validateSimpleEmail,
} from "@/utils/basic"
import { IUser } from "@/ts/interfaces/user"

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body))
    const { email, password } = data

    const isBodyValid = validateEmptyProperties(data)

    if (!isBodyValid.success) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    if (!validateSimpleEmail(email)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidEmail,
      })
    }

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findOne({
      email,
    }).select("+password")

    const passwordHash =
      user === null ? false : await bcrypt.compare(password, user.password)

    if (!user || !passwordHash) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidCredentials,
      })
    }

    const payload = {
      userId: user.id,
      userEmail: user.email,
    }

    const accessToken = await generateJWT(payload, "7d")

    res.status(httpStatus.ok.code).json({
      user: user,
      accessToken,
      message: apiMessages.success.authentication.login,
    })
  } catch (error) {
    console.log("🚀 ~ file: loginUser.ts:58 ~ loginUser ~ error:", error)
    return res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  } finally {
    mongoose.disconnect()
  }
}

export default loginUser
