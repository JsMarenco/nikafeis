import { NextFunction, Request, Response } from "express"

import Post from "../../models/Post"

const deleteAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Post.deleteMany({})

    res.status(200).json({
      message: "All posts deleted"
    })
  }
  catch (error) {
    console.log(`Error in deleteAllPost ${error}`)

    next(error)
  }
}

export default deleteAllPost