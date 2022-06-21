import { NextFunction, Request, Response } from "express"

import Post from "../../models/Post"

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      postId = ""
    } = req.params

    if (!postId) {
      return res.status(400).json({
        error: "Please provide all required fields"
      })
    }

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(400).json({
        error: "Post not found"
      })
    }

    const infoUser = {
      username: 1,
      name: 1,
      lastName: 1,
      avatar: 1,
    }

    const infoComments = {
      body: 1,
      createdAt: 1,
      updatedAt: 1,
      user: 1,
      likes: 1,
      replies: 1,
    }

    Post
      .findById(post._id)
      .populate({
        path: "user",
        select: infoUser,
      })
      .populate({
        path: "likes",
        select: infoUser,
      })
      .populate({
        path: "shares",
        select: infoUser,
      })
      .exec(function (err, post) {
        if (err) return console.log("Error: " + err)

        res.status(200).json(post)
      })
  }
  catch (error) {
    console.log(`Error in getPost ${error}`)

    next(error)
  }
}

export default getPost