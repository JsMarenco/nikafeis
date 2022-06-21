import { Request, Response, NextFunction } from "express"

import bcrypt from "bcrypt"

import User from "../../models/User"

import { generateUsername, validateSimpleEmail } from "../../utils"

const defaultAvatar = "https://images.unsplash.com/photo-1613980280629-d5547a372094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1512&q=80"
const defaultCover = "https://images.unsplash.com/photo-1654362248566-6804dbcc5bdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name = "",
      email = "",
      password = "",
      passwordConfirmation = "",
      lastName = "",
    } = req.body

    if (!name || !email || !password || !passwordConfirmation || !lastName) {
      return res.status(400).json({
        error: "Missing fields",
      })
    } else if (password !== passwordConfirmation) {
      return res.status(400).json({
        error: "Passwords do not match",
      })
    } else if (!validateSimpleEmail(email)) {
      return res.status(400).json({
        error: "Invalid email",
      })
    }

    // checkif user already exists
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        error: "User already exists",
      })
    }
    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      lastName,
      email,
      password: passwordHash,
      username: generateUsername(`${name} ${lastName}`),
      description: "Description not set",
      avatar: defaultAvatar,
      cover: defaultCover,
      privateAccount: false,
      website: "Website not set",
      createAt: new Date(),
    })

    const userSaved = await newUser.save()

    res.status(201).json(userSaved)
  }
  catch (error) {
    console.log(`Error in register: ${error}`)

    next(error)
  }
}

export default register
