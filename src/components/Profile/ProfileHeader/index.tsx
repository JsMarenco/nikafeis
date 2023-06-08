import { useEffect, useState } from "react"

// Third-party dependencies
import { useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"

// Current project dependencies
import { RootState } from "@/app/store"
import useFriendRequest from "@/hooks/user/useFriendRequest"
import ProfileHeaderUI from "./ProfileHeaderUI"
import { IProfileHeader } from "@/ts/interfaces/profile"

export default function ProfileHeader({
  firstname,
  lastname,
  avatarUrl,
  coverUrl,
  email,
  id,
  friendRequests,
  friendRequestsSent,
  loading,
  fetchUserInfo,
}: IProfileHeader) {
  const matches = useMediaQuery("(min-width:600px)")
  const [info, setInfo] = useState({
    friendRequestId: "",
    isProfileOwnerFriendOfMainUser: false,
    hasProfileOwnerSomeFriendRequestFromMainUser: false,
    hasMainUserSomeFriendRequestFromProfileOwner: false,
    isProfileOwnerStranger: false,
    isMainUser: false,
  })

  const { accountInfo, relationships } = useSelector(
    (state: RootState) => state.user
  )

  const {
    loading: loadingButtons,
    handleAcceptFriendRequest,
    handleSendFriendRequest,
    handleCancelFriendRequest,
    handleRejectFriendRequest,
  } = useFriendRequest()

  useEffect(() => {
    // Check if profile owner is friend
    const isProfileOwnerFriendOfMainUser = relationships.friends.includes(id)

    // Check if the profile owner has received a friend request from the main user
    const hasProfileOwnerSomeFriendRequestFromMainUser = friendRequests.some(
      (id) => relationships.friendRequestsSent.includes(id)
    )

    // Check if the main user has received a friend request to the profile owner
    const hasMainUserSomeFriendRequestFromProfileOwner =
      relationships.friendRequests.some((id) => friendRequestsSent.includes(id))

    // Check if the profile owner is a stranger
    const isProfileOwnerStranger =
      !isProfileOwnerFriendOfMainUser &&
      !hasProfileOwnerSomeFriendRequestFromMainUser &&
      !hasMainUserSomeFriendRequestFromProfileOwner &&
      accountInfo.id !== id

    // Fing the friend request ID
    const checkFriendRequests = friendRequests.some((id) =>
      relationships.friendRequestsSent.includes(id)
    )

    // Fing the friend request ID
    const checkFriendRequestsSent = relationships.friendRequests.some((id) =>
      friendRequestsSent.includes(id)
    )

    if (checkFriendRequests) {
      const index = friendRequests.findIndex((id) =>
        relationships.friendRequestsSent.includes(id)
      )

      setInfo((prevInfo) => ({
        ...prevInfo,
        friendRequestId: friendRequests[index],
      }))
    } else if (checkFriendRequestsSent) {
      const index = relationships.friendRequests.findIndex((id) =>
        friendRequestsSent.includes(id)
      )

      setInfo((prevInfo) => ({
        ...prevInfo,
        friendRequestId: relationships.friendRequests[index],
      }))
    } else {
      setInfo((prevInfo) => ({
        ...prevInfo,
        friendRequestId: "",
      }))
    }

    setInfo((prevInfo) => ({
      ...prevInfo,
      isProfileOwnerFriendOfMainUser,
      hasProfileOwnerSomeFriendRequestFromMainUser,
      hasMainUserSomeFriendRequestFromProfileOwner,
      isProfileOwnerStranger,
      isMainUser: accountInfo.id === id,
    }))
  }, [
    friendRequests,
    friendRequestsSent,
    relationships.friendRequests,
    relationships.friendRequestsSent,
    accountInfo.id,
    relationships.friends,
    id,
    relationships,
  ])

  return (
    <ProfileHeaderUI
      firstname={firstname}
      lastname={lastname}
      avatarUrl={avatarUrl}
      coverUrl={coverUrl}
      email={email}
      id={id}
      isMainUser={info.isMainUser}
      isProfileOwnerStranger={info.isProfileOwnerStranger}
      isProfileOwnerFriendOfMainUser={info.isProfileOwnerFriendOfMainUser}
      hasProfileOwnerSomeFriendRequestFromMainUser={
        info.hasProfileOwnerSomeFriendRequestFromMainUser
      }
      hasMainUserSomeFriendRequestFromProfileOwner={
        info.hasMainUserSomeFriendRequestFromProfileOwner
      }
      matches={matches}
      handleAcceptFriendRequest={handleAcceptFriendRequest}
      handleRejectFriendRequest={handleRejectFriendRequest}
      handleSendFriendRequest={handleSendFriendRequest}
      handleCancelFriendRequest={handleCancelFriendRequest}
      loadingButtons={loadingButtons}
      friendRequestId={info.friendRequestId}
      userId={accountInfo.id}
      loading={loading}
      fetchUserInfo={fetchUserInfo}
    />
  )
}
