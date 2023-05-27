// Third-party dependencies
import axios from "axios"

// Current project dependencies
import { IGlobalApiResponse } from "@/ts/interfaces/api"
import apiRoutes from "@/constants/api/routes"
import httpStatus from "@/constants/common/httpStatus"
import { ICreateComment } from "@/ts/interfaces/comment"

const createCommentService = async (
  payload: ICreateComment,
  userId: string,
  postId: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    const { data, status } = await axios.post(
      apiRoutes.comment.create(postId, userId),
      payload,
      config
    )

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

export default createCommentService
