import mongoose from "mongoose"

const { Schema } = mongoose

// post schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image_src: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  shares: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
})

// model for post
const Post = mongoose.model("Post", PostSchema)

PostSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export model
export default Post