// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies
import { IBasicUserInfo } from "./user"

/**
 * Interface representing a comment.
 */
export interface IComment {
  id: string
  content: string
  likes: string[]
  author: Schema.Types.ObjectId
  post: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

/**
 * Comment interface populated
 */

export interface ICommentWithPopulated extends Omit<IComment, "author"> {
  author: IBasicUserInfo
}

/**
 * Create comment
 */
export interface ICreateComment extends Pick<IComment, "content"> {}
