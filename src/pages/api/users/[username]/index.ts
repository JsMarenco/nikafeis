// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import getUserByUsername from "@/controllers/user/getUserByUsername"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getUserByUsername(req, res)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
