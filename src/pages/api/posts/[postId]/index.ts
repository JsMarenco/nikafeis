// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import getPost from "@/controllers/post/getPost"
import deletePost from "@/controllers/post/deletePost"
import updatePost from "@/controllers/post/updatePost"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getPost(req, res)
      break

    case "DELETE":
      deletePost(req, res)
      break

    case "PUT":
      updatePost(req, res)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
