// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import rejectFriendRequest from "@/controllers/friendRequest/rejectFriendRequest"
import authentication from "@/middlewares/authentication"

export default function rejectFriendRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      authentication(req, res, rejectFriendRequest)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
