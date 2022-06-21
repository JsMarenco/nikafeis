import mongoose from "mongoose"

const { Schema } = mongoose

// comment schema
const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",    
  },
  image_src: {
    type: String,
    default: "",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  }
})

// model for Comment
const Comment = mongoose.model("Comment", CommentSchema)

CommentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export model
export default Comment