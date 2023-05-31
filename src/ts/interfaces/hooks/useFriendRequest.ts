/* eslint-disable no-unused-vars */
export interface IUseFriendRequest {
  loading: boolean

  handleAcceptFriendRequest: (
    friendRequestId: string,
    receiverId: string
  ) => void
  handleRejectFriendRequest: (friendRequestId: string, senderId: string) => void
  handleSendFriendRequest: (receiverId: string) => void
  handleCancelFriendRequest: (
    friendRequestId: string,
    receiverId: string
  ) => void
}
