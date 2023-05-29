// Third-party dependencies
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"

const paginationValidator = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: NextApiHandler
) => {
  try {
    const { offset = "", limit = "" } = req.query

    if (offset === "" || limit === "") {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.limitOffset,
      })
    }

    const offsetValue = parseInt(offset as string)
    const limitValue = parseInt(limit as string)

    if (isNaN(offsetValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.offsetMustBeNumber,
      })
    }

    if (isNaN(limitValue)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.limitMustBeNumber,
      })
    }

    handler(req, res)
  } catch (error) {
    return res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}

export default paginationValidator
