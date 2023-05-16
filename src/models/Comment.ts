// Third-party dependencies
import { Schema, model, models } from "mongoose"

// Current project dependencies
import { IComment } from "@/ts/interfaces/comment"

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
)

CommentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})

/**
 * Comment Model
 */
const Comment = models.Comment || model("Comment", CommentSchema)

export default Comment
