// Third-party dependencies
import axios from "axios"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import { IGlobalApiResponse } from "@/ts/interfaces/api"
import apiRoutes from "@/constants/api/routes"
import { IUpdatePost } from "@/ts/interfaces/post"

const updatePostService = async (
  payload: IUpdatePost,
  postId: string,
  userId: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data, status } = await axios.put(
      apiRoutes.post.update(postId, userId),
      payload,
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

export default updatePostService
