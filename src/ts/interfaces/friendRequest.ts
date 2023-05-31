// Third-party dependencies
import { Schema } from "mongoose"
import { IBasicUserInfo } from "./user"

// Current project dependencies

/**
 * Interface representing a friend request.
 */
export interface IFriendRequest {
  id: string
  from: Schema.Types.ObjectId
  to: Schema.Types.ObjectId
  date: Date
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
  updatedAt: Date
}

type IFriendRequestWithPopulatedPicked = "to" | "from"

export interface IFriendRequestWithPopulated
  extends Omit<IFriendRequest, IFriendRequestWithPopulatedPicked> {
  to: IBasicUserInfo
  from: IBasicUserInfo
}

export type IFriendRequestVariants = "small" | "large"
export type IFriendRequestType = "sent" | "received"
