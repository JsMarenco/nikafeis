// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"
import bcrypt from "bcrypt"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import User from "@/models/User"
import { IUser } from "@/ts/interfaces/user"
import { generateUsername, validateSimpleEmail } from "@/utils/basic"

const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 80

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      firstname = "",
      email = "",
      password = "",
      passwordConfirmation = "",
      lastname = "",
    } = req.body

    if (
      !firstname ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !lastname
    ) {
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

    if (password !== passwordConfirmation) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.password.passwordsDoNotMatch,
      })
    }

    if (!validateSimpleEmail(email)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidEmail,
      })
    }

    // checkif user already exists
    const user = await User.findOne({ email })

    if (user) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.user.userAlreadyExists,
      })
    }

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser: HydratedDocument<IUser> = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
      username: generateUsername(),
    })

    await newUser.save()

    res.status(httpStatus.created.code).json({
      user: newUser,
      message: apiMessages.success.user.created,
    })
  } catch (error: any) {
    res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}

export default registerUser
