import { Request, Response, NextFunction } from "express"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { validateSimpleEmail } from "../../utils"

import User from "../../models/User"

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email = "",
      password = "",
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing fields",
      })
    } else if (!validateSimpleEmail(email)) {
      return res.status(400).json({
        error: "Invalid email",
      })
    }

    const user = await User.findOne({ email })

    const passwordHash = user === null ? false : await bcrypt.compare(password, user.password)

    if (!user || !passwordHash) {
      return res.status(400).json({
        error: "Invalid credentials",
      })
    } else {
      const userForToken = {
        id: user.id,
        username: user.username,
        email: user.email,
      }

      const secret = process.env.JWT_SECRET || "secret"

      const token = jwt.sign(userForToken, secret, {
        expiresIn: "7d",
      })

      return res.status(200).json({
        user: {
          id: user.id,

          name : user.name,
          lastMame : user.lastMame,

          username: user.username,
          email: user.email,
          description: user.description,

          avatar: user.avatar,
          cover: user.cover,

          token,

          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })
    }
  }
  catch (error) {
    console.log(`Error in login: ${error}`)

    next(error)
  }
}

export default login