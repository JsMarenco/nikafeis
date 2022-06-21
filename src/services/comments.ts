import axios from "axios"
import { CREATE_COMMENT, COMMENTS_ROUTE, LIKE_COMMENT } from "../components/contants"
import IUser from "../components/layout/interfaces/IUser"

export const getCommentData = async (user: IUser, post_id: string) => {
  const userId = user.id
  const token = user.token

  const form = document.getElementById("create-comment-form") as HTMLFormElement

  const formData = new FormData(form)

  const body = formData.get("body-input")

  const data = {
    userId,
    body,
    image_src: "",
    postId: post_id,
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  }

  const res = await axios.post(CREATE_COMMENT, data, config)

  return res
}

export const likeComment = async (user: IUser, comment_id: string) => {
  const userId = user.id
  const token = user.token

  const data = {
    userId,
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  }

  const res = await axios.post(`${LIKE_COMMENT}/${comment_id}/like`, data, config)

  return res
}

export const getCommentsByPostId = async (
  user: IUser,
  post_id: string,
  offset: number,
  limit: number
) => {

  const token = user.token

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  }

  const res = await axios.get(`${COMMENTS_ROUTE}/${post_id}/${offset}/${limit}`, config)

  return res
}