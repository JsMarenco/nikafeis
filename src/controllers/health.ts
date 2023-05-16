// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"

const health = (req: NextApiRequest, res: NextApiResponse) => {
  const status = {
    author: "Angel Marenco",
    gitRepository: "https://github.com/JsMarenco/nikafeis.git",
    message: "Welcome to this Nikafeis Api",
  }

  res.status(httpStatus.ok.code).json(status)
}

export default health
