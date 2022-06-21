import axios from "axios"

import {
  GET_USER,
  REGISTER_USER,
  FORGOT_PASSWORD,
  LOGIN_USER,
  GET_USER_POSTS,
  UPDATE_USER_INFO,
  DELETE_ACCOUNT,
  RESET_PASSWORD
} from "../components/contants"
import IUser from "../components/layout/interfaces/IUser"
import { deleteSpacesAndReplaceWithUnderscore } from "../utils"

export const getRegisterData = async () => {
  const form = document.getElementById("register-form") as HTMLFormElement

  const formData = new FormData(form)

  const name = formData.get("name-input")
  const lastName = formData.get("lastname-input")
  const email = formData.get("email-input")
  const password = formData.get("password-input")
  const passwordConfirmation = formData.get("passwordConfirmation-input")

  const data = {
    name,
    lastName,
    email,
    password,
    passwordConfirmation,
  }

  const res = await axios.post(REGISTER_USER, data)

  return res
}

export const getLoginData = async () => {
  const form = document.getElementById("login-form") as HTMLFormElement

  const formData = new FormData(form)

  const email = formData.get("email-input")
  const password = formData.get("password-input")

  const data = {
    email,
    password,
  }

  const res = await axios.post(LOGIN_USER, data)

  return res
}

export const getForgotPasswordData = async () => {
  const form = document.getElementById("forgot-password-form") as HTMLFormElement

  const formData = new FormData(form)

  const email = formData.get("email-input")

  const data = {
    email,
  }

  const res = await axios.post(FORGOT_PASSWORD, data)

  return res
}

export const getUserByUsername = async (username: string) => {
  const user = await axios.get(`${GET_USER}/${username}`)

  return user.data
}

export const getUserPosts = async (username: string) => {
  const res = await axios.get(`${GET_USER_POSTS}/${username}/posts`)

  return res.data
}

export const getEditAccountData = async (userId: string) => {
  const form = document.getElementById("edit-account-form") as HTMLFormElement

  const formData = new FormData(form)

  const name = formData.get("name")
  const lastName = formData.get("lastName")
  const username = formData.get("username")
  const email = formData.get("email")
  const website = formData.get("website")
  const description = formData.get("description")
  const password = formData.get("password")

  const data = {
    name,
    lastName,
    username: deleteSpacesAndReplaceWithUnderscore(username as string),
    email,
    website,
    description,
    password,
  }

  const res = await axios.put(`${UPDATE_USER_INFO}/${userId}`, data)

  return res
}

export const deleteAccount = async (id: string) => {
  const form = document.getElementById("delete-account-form") as HTMLFormElement

  const formData = new FormData(form)

  const password = formData.get("password")

  const data = {
    password,
  }

  const res = await axios.post(`${DELETE_ACCOUNT}/${id}`, data)

  return res
}

export const getResetPasswordData = async () => {
  // get user id and token from the url
  // example of url with token and userid using query params: user.com/reset-password?token=123&userid=456

  const url = window.location.href
  const urlParts = url.split("?")
  const queryString = urlParts[1]
  const queryStringParts = queryString.split("&")

  const token = queryStringParts[0].split("=")[1]
  const userId = queryStringParts[1].split("=")[1]

  const form = document.getElementById("reset-password-form") as HTMLFormElement

  const formData = new FormData(form)

  const password = formData.get("password")

  const data = {
    newPassword: password,
    token,
  }

  const res = await axios.post(`${RESET_PASSWORD}/${userId}/reset-password`, data)

  return res
}

export const saveUser = (user: IUser) => {
  window.localStorage.setItem("user", JSON.stringify(user))
}

export const getEditAvatarData = async (userId: string) => {
  const form = document.getElementById("edit-avatar-form") as HTMLFormElement

  const formData = new FormData(form)

  const avatar = formData.get("image-input")
  const password = formData.get("password")

  const data = {
    image_src: avatar,
    password,
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }

  const res = await axios.put(`${UPDATE_USER_INFO}/${userId}`, data, config)

  return res
}