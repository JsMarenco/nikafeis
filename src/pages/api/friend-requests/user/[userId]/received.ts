// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import getFriendRequestsByUserId from "@/controllers/friendRequest/getFriendRequestsByUserId"
import paginationValidator from "@/middlewares/paginationValidator"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      paginationValidator(req, res, getFriendRequestsByUserId)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
