// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import sendFriendRequest from "@/controllers/friendRequest/sendFriendRequest"
import authentication from "@/middlewares/authentication"

export default function sendFriendRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      authentication(req, res, sendFriendRequest)
      break

    default:
      return res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
