import { Request, Response, NextFunction } from "express"

import User from "../../models/User"

const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      username = "",
    } = req.params

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      })
    }
    
    return res.status(200).json(user)
  }
  catch (error) {
    console.log(`Error in getUserByUsername: ${error}`)

    next(error)
  }
}

export default getUserByUsername