import { NextFunction, Request, Response } from "express"

import Post from "../../models/Post"

const getRecentPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const infoUser = {
      username: 1,
      name: 1,
      lastName: 1,
      avatar: 1,
    }

    Post
      .find({})
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
      .exec(function (err, posts) {
        if (err) return console.log("Error: " + err)

        posts = posts.reverse()

        res.status(200).json(posts)
      })
  }
  catch (error) {
    console.log(`Error in getRecentPosts ${error}`)

    next(error)
  }
}

export default getRecentPosts