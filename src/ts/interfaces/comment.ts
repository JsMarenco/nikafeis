// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

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
 * Create comment
 */
export interface ICreateComment extends Pick<IComment, "content"> {}
