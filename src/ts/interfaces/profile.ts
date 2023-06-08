// Third-party dependencies

// Current project dependencies
import { IUseFriendRequest } from "./hooks/useFriendRequest"
import { IUser } from "./user"

type ProfileHeaderPropsPicked =
  | "id"
  | "firstname"
  | "lastname"
  | "avatarUrl"
  | "coverUrl"
  | "email"
  | "friendRequests"
  | "friendRequestsSent"

export interface IProfileHeader extends Pick<IUser, ProfileHeaderPropsPicked> {
  loading: boolean
  fetchUserInfo: () => void
}

type picked =
  | "handleAcceptFriendRequest"
  | "handleRejectFriendRequest"
  | "handleSendFriendRequest"
  | "handleCancelFriendRequest"

type picked2 = "friendRequests" | "friendRequestsSent"

export interface IProfileHeaderUI
  extends Omit<IProfileHeader, picked2>,
    Pick<IUseFriendRequest, picked> {
  matches: boolean
  isMainUser: boolean
  isProfileOwnerStranger: boolean
  isProfileOwnerFriendOfMainUser: boolean
  hasProfileOwnerSomeFriendRequestFromMainUser: boolean
  hasMainUserSomeFriendRequestFromProfileOwner: boolean
  loadingButtons: boolean
  userId: string
  friendRequestId: string
}
