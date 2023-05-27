// Third-party dependencies

// Current project dependencies
import { ICreateComment } from "@/ts/interfaces/comment"
import { ICreatePost } from "@/ts/interfaces/post"
import { ILoginUser, IRegisterUser } from "@/ts/interfaces/user"

/**
 * This is a fake payload for register an user
 */
export const registerUserPayload: IRegisterUser = {
  firstname: "Benjamin",
  lastname: "Williamson",
  email: "test@gmail.com",
  password: "password123",
  confirmPassword: "password123",
}

/**
 * This is a fake payload for logn an user
 */
export const loginUserPayload: ILoginUser = {
  email: "test@gmail.com",
  password: "password123",
}

/**
 * This is a fake payload for create a post
 */
export const createPostPayload: ICreatePost = {
  title: "laboriosam non velit",
  content: "Dignissimos consequatur mollitia.",
}

/**
 * This is a fake payload for create a comment
 */
export const createCommentPayload: ICreateComment = {
  content: "Id repudiandae dolorum facere quidem.",
}

export const wrongId = "wrong-id"
export const wrongEmail = "wrong-email"
export const wrongPassword = "wrong-password"
export const documentId = "646e88c5a85a16084f1584b3"

export const testMessage = (message: string) => `Should return "${message}"`
