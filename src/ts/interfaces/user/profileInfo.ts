// Third-party dependencies
import { Schema } from "mongoose"

// Current project dependencies

export interface IProfileInfo {
  posts: Schema.Types.ObjectId[]
}
