//urls

export const REGISTER_USER = `${process.env.REACT_APP_API_URL}/users/register`
export const LOGIN_USER = `${process.env.REACT_APP_API_URL}/users/login`
export const FORGOT_PASSWORD = `${process.env.REACT_APP_API_URL}/users/forgot-password`
export const RESET_PASSWORD = `${process.env.REACT_APP_API_URL}/users`

export const GET_USER = `${process.env.REACT_APP_API_URL}/users`
export const GET_USER_POSTS = `${process.env.REACT_APP_API_URL}/users`
export const UPDATE_USER_INFO = `${process.env.REACT_APP_API_URL}/users`
export const DELETE_ACCOUNT = `${process.env.REACT_APP_API_URL}/users`

export const CREATE_POST = `${process.env.REACT_APP_API_URL}/posts`
export const GET_POST = `${process.env.REACT_APP_API_URL}/posts`

export const LIKE_POST = `${process.env.REACT_APP_API_URL}/posts`
export const DISLIKE_POST = `${process.env.REACT_APP_API_URL}/posts`
export const GET_RECENT_POSTS = `${process.env.REACT_APP_API_URL}/posts/recent`

export const GET_RECENT_VIEOS = `${process.env.REACT_APP_API_URL}/videos/recent`

export const CREATE_COMMENT = `${process.env.REACT_APP_API_URL}/comments`
export const LIKE_COMMENT = `${process.env.REACT_APP_API_URL}/comments`
export const GET_COMMENTS_BY_POST_ID = `${process.env.REACT_APP_API_URL}/comments`

export const USER_ROUTE = `${process.env.REACT_APP_API_URL}/users`
export const COMMENTS_ROUTE = `${process.env.REACT_APP_API_URL}/comments`
export const POST_ROUTE = `${process.env.REACT_APP_API_URL}/posts`