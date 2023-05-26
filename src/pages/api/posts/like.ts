// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import likePost from "@/controllers/post/likePost"
import authentication from "@/middlewares/authentication"

export default function likeHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      authentication(req, res, likePost)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
