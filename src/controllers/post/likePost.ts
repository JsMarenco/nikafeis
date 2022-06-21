import { NextFunction, Request, Response } from "express"

import Post from "../../models/Post"
import User from "../../models/User"

const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      postId = "",
    } = req.params

    const {
      userId = ""
    } = req.body

    if (!postId || !userId) {
      return res.status(400).json({
        error: "Please provide all required fields"
      })
    }

    const user = await User.findById(userId)

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(400).json({
        error: "Post not found"
      })
    } else if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
    }

    // objectId interface 
    interface ObjectId {
      _id: string
    }

    // check if user already liked the post
    const liked = post.likes.find((like: ObjectId) => like._id.toString() === userId)

    if (liked) {
      // find post by id and remove userId from likes

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            likes: user._id,
          }
        },
        { new: true }
      )

      return res.status(200).json(updatedPost)
    } else {
      // find post by id and update likes

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            likes: user._id,
          }
        },
        { new: true }
      )

      return res.status(200).json(updatedPost)
    }
  }

  catch (err) {
    console.log(`Error in likePost: ${err}`)

    next(err)
  }
}

export default likePost