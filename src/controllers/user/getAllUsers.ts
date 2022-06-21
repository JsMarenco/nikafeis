import { Request, Response, NextFunction } from "express"

import User from "../../models/User"

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({})

    res.status(200).json(users)
  }
  catch (error) {
    console.log(`Error in getAllUsers: ${error}`)

    next(error)
  }
}

export default getAllUsers