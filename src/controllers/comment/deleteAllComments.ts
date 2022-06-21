import { NextFunction, Request, Response } from "express"

import Comment from "../../models/Comment"

const deletAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    await Comment.deleteMany({})

    return res.status(200).json({
      message: "All comments deleted"
    })
  }

  catch (err) {
    console.log(`Error in deletAllComments: ${err}`)

    next(err)
  }
}

export default deletAllComments
