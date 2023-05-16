// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

/**
 * Interface representing a comment.
 */
export interface IComment {
  id?: string
  content: string
  likes: Array<Schema.Types.ObjectId | string>
  author: Schema.Types.ObjectId | string
  post: Schema.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}
