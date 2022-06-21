import { NextFunction, Request, Response } from "express"

import jwt from "jsonwebtoken"

import Post from "../../models/Post"
import User from "../../models/User"

import uploadImageToCloudinary from "../../cloudinary"

const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId = "",
      title = "",
      body = "",
    } = req.body

    if (!userId || !title || !body) {
      return res.status(400).json({
        error: "Please provide all required fields"
      })
    }

    const user = await User.findById(userId)

    //get the token from the header

    const token = req.headers.authorization as string

    // separte the token from the Bearer string
    const tokenArray = token.split(" ")

    // get the token
    const tokenString = tokenArray[1] as string

    const secret = process.env.JWT_SECRET || "secret"

    // verify the token

    const decoded = jwt.verify(tokenString, secret)

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
    }

    const localImageUrl = req.file?.path as string

    let imageSaved = ""

    if (localImageUrl) {
      imageSaved = await uploadImageToCloudinary(localImageUrl)
    }

    const newPost = new Post({
      userId,
      title,
      body,
      image_src: imageSaved,
      createdAt: new Date(),
      user: user._id,
    })

    const postSaved = await newPost.save()

    const finalPost = await Post.findById(postSaved.id).populate("user", {
      username: 1,
      name: 1,
      lastName: 1,
      avatar: 1,
    })

    user.posts = user.posts.concat(postSaved.id)

    await user.save()

    res.status(200).json(finalPost)
  }
  catch (error) {
    console.log(`Error in createPost: ${error}`)

    next(error)
  }
}

export default createPost