import axios from "axios"

import IUser from "../components/layout/interfaces/IUser"

import {
  CREATE_POST,
  POST_ROUTE,
  GET_POST,
  GET_RECENT_POSTS
} from "../components/contants"

export const getNewPostData = async (user: IUser) => {
  const userId = user.id
  const token = user.token

  const form = document.getElementById("create-post-form") as HTMLFormElement
  const formData = new FormData(form)

  const title = formData.get("title-input")
  const body = formData.get("body-input")
  const image_src = formData.get("image-input")

  const data = {
    userId,
    title,
    body,
    token,
    image_src
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  }

  const res = await axios.post(CREATE_POST, data, config)

  return res
}

export const generateShareLink = (postId: string) => {
  return `${window.location.origin}/posts/${postId}`
}

export const likePost = async (user: IUser, postId: string) => {
  const userId = user.id
  const token = user.token

  const data = {
    userId,
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const res = await axios.put(`${POST_ROUTE}/${postId}/like`, data, config)

  return res.data
}

export const getPost = async (postId: string) => {
  const res = await axios.get(`${GET_POST}/${postId}`)

  return res.data
}

export const getRecentPosts = async () => {
  const res = await axios.get(GET_RECENT_POSTS)

  return res.data
}