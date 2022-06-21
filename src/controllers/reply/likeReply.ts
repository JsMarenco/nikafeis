import { NextFunction, Request, Response } from "express"

import Reply from "../../models/Reply"
import User from "../../models/User"
import Comment from "../../models/Comment"

const likeReply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      replyId = "",
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
    const reply = await Reply.findById(replyId)
    const comment = await Comment.findById(commentId)

    if (!reply) {
      return res.status(400).json({
        error: "Reply not found"
      })
    } else if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
    } else if (!comment) {
      return res.status(400).json({
        error: "Comment not found"
      })
    }

    // objectId interface
    interface ObjectId {
      _id: string
    }

    // check if user already liked the comment
    const liked = reply.likes.find((like: ObjectId) => like._id.toString() === userId)

    if (liked) {
      // find comment by id and remove userId from likes
      const updatedReply = await Reply.findByIdAndUpdate(
        replyId,
        {
          $pull: {
            likes: user._id,
          }
        },
        {
          new: true
        }
      )

      reply.likes = reply.likes.concat(user._id)

      await reply.save()

      return res.status(200).json({
        message: "Reply liked",
        updatedReply
      })
    } else {
      // find comment by id and add userId to likes

      const updatedReply = await Reply.findByIdAndUpdate(
        replyId,
        {
          $push: {
            likes: user._id,
          }
        },
        {
          new: true
        }
      )

      reply.likes = reply.likes.concat(user._id)

      await reply.save()

      return res.status(200).json({
        message: "Reply liked",
        updatedReply
      })
    }
  }

  catch (err) {
    console.log(`Error in likeComment: ${err}`)

    next(err)
  }
}

export default likeReply
