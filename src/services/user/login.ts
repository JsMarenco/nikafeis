// Third-party dependencies
import axios from "axios"

// Current project dependencies
import { IGlobalApiResponse } from "@/ts/interfaces/api"
import apiRoutes from "@/constants/api/routes"
import httpStatus from "@/constants/common/httpStatus"

const loginService = async (
  email: string,
  password: string
): Promise<IGlobalApiResponse> => {
  try {
    const body = {
      email,
      password,
    }

    const { data, status } = await axios.post(apiRoutes.user.login, body)

    const apiAnswer: IGlobalApiResponse = {
      body: data,
      message: data.message,
      success: true,
      status,
    }

    return apiAnswer
  } catch (err: unknown) {
    const apiAnswer = {
      body: [],
      message: httpStatus.badRequest.message,
      success: false,
      status: httpStatus.badRequest.code,
    }

    if (axios.isAxiosError(err)) {
      apiAnswer.body = err.response?.data
      apiAnswer.message = err.response?.data.message
      apiAnswer.status = err.response?.status || httpStatus.badRequest.code
    }

    return apiAnswer
  }
}

export default loginService
