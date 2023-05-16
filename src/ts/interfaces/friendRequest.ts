// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

/**
 * Interface representing a friend request.
 */
export interface IFriendRequest {
  id?: string
  from: Schema.Types.ObjectId
  to: Schema.Types.ObjectId
  date: Date
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
  updatedAt: Date
}
