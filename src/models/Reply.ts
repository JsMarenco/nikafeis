import mongoose from "mongoose"

const { Schema } = mongoose

// reply schema
const ReplySchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",    
  },
  image_src: {
    type: String,
    default: "",
  },
  comment:{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }
})

// model for Reply
const Reply = mongoose.model("Reply", ReplySchema)

ReplySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export model
export default Reply