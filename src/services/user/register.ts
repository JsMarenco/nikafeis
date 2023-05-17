// Third-party dependencies
import axios from "axios"

// Current project dependencies
import { IGlobalApiResponse } from "@/ts/interfaces/api"
import apiRoutes from "@/constants/api/routes"
import httpStatus from "@/constants/common/httpStatus"
import { IRegisterUser } from "@/ts/interfaces/user"

/**
 * Response object from the API when an error occurs.
 */
const registerService = async (
  payload: IRegisterUser
): Promise<IGlobalApiResponse> => {
  try {
    const { data, status } = await axios.post(apiRoutes.user.register, payload)

    const apiAnswer: IGlobalApiResponse = {
      body: data,
      message: data.message,
      success: true,
      status,
    }

    return apiAnswer
  } catch (err: any) {
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

export default registerService
