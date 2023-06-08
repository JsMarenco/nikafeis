// Third-party dependencies

// Current project dependencies
import {
  IFriendRequestType,
  IFriendRequestVariants,
  IFriendRequestWithPopulated,
} from "@/ts/interfaces/friendRequest"
import FriendRequestCard from "@/components/Cards/FriendRequestCard"

interface FriendRequestListProps {
  variant: IFriendRequestVariants
  friendRequests: IFriendRequestWithPopulated[]
  type: IFriendRequestType
  loading: boolean
}

export default function FriendRequestList({
  variant,
  friendRequests,
  type,
}: FriendRequestListProps) {
  return (
    <>
      {friendRequests.map((request) => (
        <FriendRequestCard
          key={request.id}
          friendRequestId={request.id}
          date={request.date}
          user={type === "received" ? request.from : request.to}
          type={type}
          variant={variant}
        />
      ))}
    </>
  )
}
