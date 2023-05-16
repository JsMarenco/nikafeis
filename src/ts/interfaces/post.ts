// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

/**
 * Interface representing a post.
 */
export interface IPost {
  id?: string
  title: string
  content: string
  views: number
  shares: number
  comments: Schema.Types.ObjectId[] | string[]
  likes: Schema.Types.ObjectId[] | string[]
  reports: Schema.Types.ObjectId[] | string[]
  postImages: string[]
  author: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
