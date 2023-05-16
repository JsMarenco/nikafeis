// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

/**
 * Interface representing an user.
 */
export interface IUser {
  id?: string
  username: string
  email: string
  password: string
  firstname: string
  lastname: string
  description?: string
  avatarUrl?: string
  coverUrl?: string
  website?: string
  posts: Schema.Types.ObjectId[]
  friends: Schema.Types.ObjectId[]
  friendRequests: Schema.Types.ObjectId[]
  friendRequestsSent: Schema.Types.ObjectId[]
  facebookLink?: string
  githubLink?: string
  linkedinLink?: string
  twitterLink?: string
  instagramLink?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * User projection for populating fields.
 */
export const userProjection = {
  username: 1,
  firstname: 1,
  lastname: 1,
  avatarUrl: 1,
}
