// Third-party dependencies

import { Schema } from "mongoose"
import { IBasicUserInfo } from "./user"

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
  comments: string[]
  likes: string[]
  reports: string[]
  postImages: string[]
  author: Schema.Types.ObjectId
  createdAt: string
  updatedAt: string
}

type IPostWithPopulatedPicked = "comments" | "author"

export interface IPostWithPopulated
  extends Omit<IPost, IPostWithPopulatedPicked> {
  author: IBasicUserInfo
  comments: IBasicUserInfo[]
}

type TUpdatePostOmit = Omit<IPost, "id" | "updatedAt" | "createdAt">

/**
 * Update Post
 */
export interface IUpdatePost extends Partial<TUpdatePostOmit> {}

/**
 * Create Post
 */

export interface ICreatePost extends Pick<IPost, "title" | "content"> {}
