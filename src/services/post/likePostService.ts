// Third-party dependencies
import axios from "axios"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import { IGlobalApiResponse } from "@/ts/interfaces/api"
import apiRoutes from "@/constants/api/routes"

const likePostService = async (
  postId: string,
  userId: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    const { data, status } = await axios.put(
      apiRoutes.post.like(postId, userId),
      {},
      config
    )

    const newResponse: IGlobalApiResponse = {
      body: data.post,
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

export default likePostService
