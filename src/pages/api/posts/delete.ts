// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import deletePost from "@/controllers/post/deletePost"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "DELETE":
      deletePost(req, res)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
