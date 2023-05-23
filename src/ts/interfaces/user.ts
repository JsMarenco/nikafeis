// Third-party dependencies

// Current project dependencies
import { IAccountInfo } from "./user/accountInfo"
import { IAuth } from "./user/auth"
import { IPersonalInfo } from "./user/personalInfo"
import { IProfileInfo } from "./user/profileInfo"
import { IRelationships } from "./user/relationships"
import { ISocialMediaLinks } from "./user/socialMediaLinks"
import { ITimestamps } from "./user/timestamps"

/**
 * Interface representing an user.
 */
export interface IUser
  extends IAccountInfo,
    IPersonalInfo,
    IProfileInfo,
    IRelationships,
    ISocialMediaLinks,
    ITimestamps,
    IAuth {}

/**
 * User projection for populating fields.
 */
export const userProjection = {
  username: 1,
  firstname: 1,
  lastname: 1,
  avatarUrl: 1,
}

/**
 * Register user type
 */
type TRegisterUserPicked = "firstname" | "lastname" | "email" | "password"

export interface IRegisterUser extends Pick<IUser, TRegisterUserPicked> {
  confirmPassword: string
}

/**
 * Login interface
 */
export interface ILoginUser extends Pick<IUser, "email" | "password"> {}
