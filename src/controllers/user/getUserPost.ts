import { Request, Response, NextFunction } from "express"

import User from "../../models/User"
import Post from "../../models/Post"

const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      })
    }

    const infoUser = {
      username: 1,
      name: 1,
      lastName: 1,
      avatar: 1,
    }

    Post
      .find({ user: user._id })
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
      .populate({
        path: "created_at",
        select: "created_at",
      })
      .populate({
        path: "updated_at",
        select: "updated_at",
      })
      .exec(function (err, posts) {
        if (err) return console.log("Error: " + err)

        posts = posts.reverse()

        res.status(200).json(posts)
      })
  }
  catch (error) {
    console.log(`Error in getUserPosts: ${error}`)

    next(error)
  }
}

export default getUserPosts
