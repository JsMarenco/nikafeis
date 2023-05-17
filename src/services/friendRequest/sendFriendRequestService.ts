// Third-party dependencies
import axios from "axios"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import { IGlobalApiResponse } from "@/ts/interfaces/api"
import apiRoutes from "@/constants/api/routes"

const sendFriendRequestService = async (
  username: string,
  userId: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const user = await axios.get(apiRoutes.user.getUserByUsername(username))

    const { data, status } = await axios.post(
      apiRoutes.friendRequest.send(userId, user.data.id),
      config
    )

    const newResponse: IGlobalApiResponse = {
      body: data,
      message: data.message,
      status: status,
      success: true,
    }

    return newResponse
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

export default sendFriendRequestService
