// Third-party dependencies

// Current project dependencies
import { IInitialUserState } from "@/ts/interfaces/states/states"

const initialUserState: IInitialUserState = {
  auth: {
    accessToken: "",
    isLogged: false,
  },

  personalInfo: {
    firstname: "",
    lastname: "",
    description: "",
    avatarUrl: "",
    coverUrl: "",
    website: "",
  },

  accountInfo: {
    id: "",
    username: "",
    email: "",
    password: "",
  },

  socialMediaLinks: {
    facebookLink: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
    instagramLink: "",
  },

  profileInfo: {
    posts: [],
  },

  timestamps: {
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  relationships: {
    friends: [],
    friendRequests: [],
    friendRequestsSent: [],
  },
}

export default initialUserState
