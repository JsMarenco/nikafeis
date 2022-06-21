import mongoose from "mongoose"

const { Schema } = mongoose

// user schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  cover: {
    type: String,
    required: false,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post",
  }],
  username: {
    type: String,
    required: true,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  friendRequests: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  privateAccount: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  website: {
    type: String,
    required: true,
  }
})

// model for user
const User = mongoose.model("User", UserSchema)

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.password
  }
})

// export model
export default User