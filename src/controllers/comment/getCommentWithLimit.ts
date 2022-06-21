import { NextFunction, Request, Response } from "express"

import Comment from "../../models/Comment"
import Post from "../../models/Post"

const getCommentWithLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      postId = "",

      limit,
      offset,
    } = req.params

    if(!postId) {
      return res.status(400).json({
        message: "postId is required",
      })
    }
    
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      })
    }

    const infoUser = {
      name: 1,
      lastName: 1,
      avatar: 1,
      username: 1,
    }

    const comments = await Comment.find({
      post: postId,
    }).populate("user", infoUser)

    // parse int offset 
    const offsetInt: number = offset as unknown as number

    // parse int limit
    const limitInt = limit as unknown as number

    // get comments with limit and offset
    const commentsWithLimit = comments.slice(offsetInt, offsetInt + limitInt)

    res.json(commentsWithLimit)
  } catch (error) {
    console.log(`Error in getCommentWithLimit: ${error}`)

    return next(error)
  }
}

export default getCommentWithLimit