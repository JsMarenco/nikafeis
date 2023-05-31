// Third-party dependencies
import { useMediaQuery } from "@mui/material"

// Current project dependencies
import FriendRequestCardUI from "./FriendRequestCardUI"
import {
  IFriendRequestType,
  IFriendRequestVariants,
  IFriendRequestWithPopulated,
} from "@/ts/interfaces/friendRequest"
import { IBasicUserInfo } from "@/ts/interfaces/user"
import useFriendRequest from "@/hooks/user/useFriendRequest"

type picked = "date"

interface FriendRequestCardProps
  extends Pick<IFriendRequestWithPopulated, picked> {
  friendRequestId: string
  user: IBasicUserInfo
  type: IFriendRequestType
  variant: IFriendRequestVariants
}

export default function FriendRequestCard({
  user,
  date,
  type,
  friendRequestId,
}: FriendRequestCardProps) {
  const matches = useMediaQuery("(min-width:425px)")
  const {
    loading,

    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleSendFriendRequest,
    handleCancelFriendRequest,
  } = useFriendRequest()

  return (
    <>
      <FriendRequestCardUI
        loading={loading}
        friendRequestId={friendRequestId}
        user={user}
        type={type}
        matches={matches}
        date={date}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
        handleRejectFriendRequest={handleRejectFriendRequest}
        handleSendFriendRequest={handleSendFriendRequest}
        handleCancelFriendRequest={handleCancelFriendRequest}
      />
    </>
  )
}
