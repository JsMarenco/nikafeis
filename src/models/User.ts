// Third-party dependencies
import { Schema, model, models } from "mongoose"

// Current project dependencies
import { IUser } from "@/ts/interfaces/user"

const UserSchema = new Schema<IUser>(
  {
    // Personal Information
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstname: {
      type: String,
      minlength: 1,
      maxlength: 15,
    },
    lastname: {
      type: String,
      minlength: 1,
      maxlength: 15,
    },
    description: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    coverUrl: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },

    // Relationships
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    friendRequestsSent: [
      {
        type: Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],

    // Social Media Links
    facebookLink: {
      type: String,
      default: "",
    },
    githubLink: {
      type: String,
      default: "",
    },
    linkedinLink: {
      type: String,
      default: "",
    },
    twitterLink: {
      type: String,
      default: "",
    },
    instagramLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
)

/**
 * User Model
 */
const User = models.User || model("User", UserSchema)

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})

export default User
