// Third-party dependencies

// Current project dependencies
import { IAccountInfo } from "../user/accountInfo"
import { IAuth } from "../user/auth"
import { IPersonalInfo } from "../user/personalInfo"
import { IProfileInfo } from "../user/profileInfo"
import { IRelationships } from "../user/relationships"
import { ISocialMediaLinks } from "../user/socialMediaLinks"
import { ITimestamps } from "../user/timestamps"

export interface IInitialUserState {
  personalInfo: IPersonalInfo
  accountInfo: IAccountInfo
  socialMediaLinks: ISocialMediaLinks
  profileInfo: IProfileInfo
  timestamps: ITimestamps
  relationships: IRelationships
  auth: IAuth
}
