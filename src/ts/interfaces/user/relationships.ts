// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

export interface IRelationships {
  friends: Schema.Types.ObjectId[]
  friendRequests: Schema.Types.ObjectId[]
  friendRequestsSent: Schema.Types.ObjectId[]
}
