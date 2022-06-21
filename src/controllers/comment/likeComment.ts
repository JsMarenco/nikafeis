import { NextFunction, Request, Response } from "express"

import Comment from "../../models/Comment"
import User from "../../models/User"

const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      commentId = "",
    } = req.params

    const {
      userId = ""
    } = req.body

    if (!userId) {
      return res.status(400).json({
        error: "Please provide all required fields"
      })
    }

    const user = await User.findById(userId)
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(400).json({
        error: "Comment not found"
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

    // check if user already liked the comment

    const liked = comment.likes.find((like: ObjectId) => like._id.toString() === userId)

    if (liked) {
      // find comment by id and remove userId from likes

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
          $pull: {
            likes: user._id,
          }
        },
        {
          new: true
        }
      )

      res.status(200).json(updatedComment)
    } else {
      // find comment by id and add userId to likes

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
          $push: {
            likes: user._id,
          }
        },
        {
          new: true
        }
      )

      res.status(200).json(updatedComment)
    }
  }

  catch (err) {
    console.log(`Error in likeComment: ${err}`)

    next(err)
  }
}

export default likeComment
