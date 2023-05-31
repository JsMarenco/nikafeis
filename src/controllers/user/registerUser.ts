// Third-party dependencies
import { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"
import bcrypt from "bcrypt"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import User from "@/models/User"
import { IRegisterUser, IUser } from "@/ts/interfaces/user"
import { generateUsername, validateSimpleEmail } from "@/utils/basic"
import connectWithRetry from "@/database"

export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 80

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body))
    const {
      email = "",
      password = "",
      confirmPassword = "",
      firstname = "",
      lastname = "",
    }: IRegisterUser = data

    if (!email || !password || !confirmPassword || !firstname || !lastname) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(httpStatus.badRequest.code).json({
        message:
          apiMessages.errors.password.passwordMinLength(MIN_PASSWORD_LENGTH),
      })
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
      return res.status(httpStatus.badRequest.code).json({
        message:
          apiMessages.errors.password.passwordMaxLength(MAX_PASSWORD_LENGTH),
      })
    }

    if (password !== confirmPassword) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.password.passwordsDoNotMatch,
      })
    }

    if (!validateSimpleEmail(email)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidEmail,
      })
    }

    await connectWithRetry()

    // checkif user already exists
    const user = await User.findOne({ email })

    if (user) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.user.userAlreadyExists,
      })
    }

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10)

    const obj: Omit<IRegisterUser, "confirmPassword"> = {
      ...data,
      password: passwordHash,
      username: generateUsername(),
    }

    const newUser: HydratedDocument<IUser> = new User(obj)

    await newUser.save()

    res.status(httpStatus.created.code).json({
      user: newUser,
      message: apiMessages.success.user.created,
    })
  } catch (error: any) {
    console.log("🚀 ~ file: registerUser.ts:94 ~ registerUser ~ error:", error)
    res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}

export default registerUser
