// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import acceptFriendRequest from "@/controllers/friendRequest/acceptFriendRequest"
import authentication from "@/middlewares/authentication"

export default function acceptFriendRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      authentication(req, res, acceptFriendRequest)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
