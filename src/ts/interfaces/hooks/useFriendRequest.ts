/* eslint-disable no-unused-vars */
export interface IUseFriendRequest {
  loading: boolean

  handleAcceptFriendRequest: (
    friendRequestId: string,
    receiverId: string,
    cb?: () => void
  ) => void
  handleRejectFriendRequest: (
    friendRequestId: string,
    senderId: string,
    cb?: () => void
  ) => void
  handleSendFriendRequest: (receiverId: string, cb?: () => void) => void
  handleCancelFriendRequest: (
    friendRequestId: string,
    receiverId: string,
    cb?: () => void
  ) => void
}
