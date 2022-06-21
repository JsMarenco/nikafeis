import { Request, Response, NextFunction } from "express"

import jwt from "jsonwebtoken"

import User from "../../models/User"

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email = "",
    } = req.body

    if (!email) {
      return res.status(400).json({
        error: "Missing fields",
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      })
    }

    const token = await generateResetPasswordToken(user.id)

    return res.status(200).json({
      userId: user.id,
      token,
    })
  }
  catch (error) {
    console.log(`Error in forgotPassword: ${error}`)

    next(error)
  }
}

const generateResetPasswordToken = async (userId: string) => {
  try {
    const secret = process.env.JWT_SECRET || "secret"

    const token = jwt.sign({
      userId
    }, secret, {
      expiresIn: "10m",
    })

    return token
  }
  catch (error) {
    console.log(`Error in generateResetPasswordToken: ${error}`)

    throw error
  }
}

export default forgotPassword