import { NextFunction, Request, Response } from "express"

import User from "../../models/User"

const deleteAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.deleteMany({})

    res.status(200).json({
      message: "All users deleted",
    })
  }
  catch (error) {
    console.log(`Error in deleteAllUsers ${error}`)

    next(error)
  }
}

export default deleteAllUsers