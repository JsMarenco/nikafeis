import { NextFunction, Request, Response } from "express"

import Post from "../../models/Post"
import User from "../../models/User"
import Comment from "../../models/Comment"

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      postId = "",
      body = "",
      image_src = "",
      userId = "",
    } = req.body

    if (!postId || !body || !userId) {
      return res.status(400).json({
        message: "Missing required fields",
      })
    }

    const post = await Post.findById(postId)
    const user = await User.findById(userId)

    if (!post || !user) {
      return res.status(404).json({
        message: "Post or user not found",
      })
    }

    const newComment = new Comment({
      body,
      image_src,
      user: user.id,
      post: post.id,
    })

    const savedComment = await newComment.save()

    post.comments = post.comments.concat(savedComment.id)

    await post.save()

    return res.status(201).json(savedComment)
  } catch (error) {
    console.log(`Error in createComment ${error}`)

    next(error)
  }
}

export default createComment