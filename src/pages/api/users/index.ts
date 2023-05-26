// Third-party dependencies
import { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import registerUser from "@/controllers/user/registerUser"
import deleteUser from "@/controllers/user/deleteUser"

export default function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      registerUser(req, res)
      break

    case "DELETE":
      deleteUser(req, res)
      break

    default:
      res.status(httpStatus.methodNotAllowed.code).json({
        message: httpStatus.methodNotAllowed.message,
      })
  }
}
