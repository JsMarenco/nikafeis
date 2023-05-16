// Third-party dependencies
import { Schema, model, models } from "mongoose"

// Current project dependencies
import { IFriendRequest } from "@/ts/interfaces/friendRequest"

const FriendRequestSchema = new Schema<IFriendRequest>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
)

/**
 * Friend Request Model
 */
const FriendRequest =
  models.FriendRequest || model("FriendRequest", FriendRequestSchema)

FriendRequestSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})

export default FriendRequest
