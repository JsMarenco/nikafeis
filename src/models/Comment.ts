// Imports from third-party libraries
import { Schema, model, models } from "mongoose"

const CommentSchema = new Schema(
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

/**
 * Comment Model
 */
const Comment = models.Comment || model("Comment", CommentSchema)

CommentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})

export default Comment
