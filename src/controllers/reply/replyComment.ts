import { NextFunction, Request, Response } from "express"

import User from "../../models/User"
import Comment from "../../models/Comment"
import Reply from "../../models/Reply"

const replyComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body = "",
      image_src = "",
      userId = "",
    } = req.body

    const { commentId = "" } = req.params

    if (!commentId || !body || !userId) {
      return res.status(400).json({
        message: "Missing required fields",
      })
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const newReply = new Reply({
      body,
      image_src,
      user,
      created_at: new Date(),
      updated_at: new Date(),
    })

    const savedReply = await newReply.save()

    comment.replies = comment.replies.concat(savedReply._id)

    const newUpdated = await comment.save()

    return res.status(201).json({
      message: "Reply created",
      newUpdated
    })
  }
  catch (error) {
    console.log(`Error in replyComment ${error}`)

    next(error)
  }
}

export default replyComment
