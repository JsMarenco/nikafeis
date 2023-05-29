// Third-party dependencies
import { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import getUserPostsByUsername from "@/controllers/user/getUserPostByUsername"

export default function getUserByUsernameHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getUserPostsByUsername(req, res)
      break

    default:
      return res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
