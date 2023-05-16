// Imports from third-party libraries
import { Schema, model, models } from "mongoose"

export const postLimits = {
  content: {
    max: 4000,
  },
}

// post schema
const PostSchema = new Schema(
  {
    // Basic post information
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    postImages: [
      {
        type: String,
      },
    ],

    // Post author information
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

/**
 * Post Model
 */
const Post = models.Post || model("Post", PostSchema)

PostSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// export model
export default Post
