// Third-party dependencies
import { Schema, model, models } from "mongoose"

// Current project dependencies
import { IPost } from "@/ts/interfaces/post"

const PostSchema = new Schema<IPost>(
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
  },
})

// export model
export default Post
