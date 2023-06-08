/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"

// Third-party dependencies
import { useDispatch, useSelector } from "react-redux"

// Current project dependencies
import { RootState } from "@/app/store"
import { AppMessageContext } from "@/context/AppMessageContext"
import sendFriendRequestService from "@/services/friendRequest/sendFriendRequestService"
import {
  setUserFriendRequests,
  setUserFriendRequestsSent,
  setUserFriends,
} from "@/app/slices/user"
import { IUseFriendRequest } from "@/ts/interfaces/hooks/useFriendRequest"
import acceptFriendRequestService from "@/services/friendRequest/acceptFriendRequestService"
import rejectFriendRequestService from "@/services/friendRequest/rejectFriendRequestService"

export default function useFriendRequest(): IUseFriendRequest {
  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(AppMessageContext)
  const { accountInfo, auth, relationships } = useSelector(
    (state: RootState) => state.user
  )
  const dispatch = useDispatch()

  /**
   * Handles accepting a friend request.
   *
   * @param {string} friendRequestId - The ID of the friend request.
   * @param {string} receiverId - The ID of the receiver.
   * @returns {Promise<void>} - A Promise that resolves when the friend request is accepted.
   */
  const handleAcceptFriendRequest = async (
    friendRequestId: string,
    receiverId: string,
    cb?: () => void
  ): Promise<void> => {
    setLoading(true)
    const { body, success, message } = await acceptFriendRequestService(
      friendRequestId,
      receiverId,
      auth.accessToken
    )

    if (success) {
      dispatch(setUserFriends(body.friends))

      if (cb) {
        cb()
      }
    }

    setLoading(false)
    handleMessage(message)
  }

  /**
   * Handles rejecting a friend request.
   *
   * @param {string} friendRequestId - The ID of the friend request.
   * @param {string} receiverId - The ID of the receiver.
   * @returns {Promise<void>} - A Promise that resolves when the friend request is rejected.
   */
  const handleRejectFriendRequest = async (
    friendRequestId: string,
    receiverId: string,
    cb?: () => void
  ): Promise<void> => {
    setLoading(true)
    const { body, success, message } = await rejectFriendRequestService(
      friendRequestId,
      receiverId,
      auth.accessToken
    )

    if (success) {
      dispatch(setUserFriendRequests(body.friendRequests))

      if (cb) {
        cb()
      }
    }

    setLoading(false)
    handleMessage(message)
    setLoading(false)
  }

  /**
   * Handles sending a friend request.
   *
   * @param {string} receiverId - The ID of the receiver.
   * @returns {Promise<void>} - A Promise that resolves when the friend request is sent.
   */
  const handleSendFriendRequest = async (
    receiverId: string,
    cb?: () => void
  ): Promise<void> => {
    setLoading(true)

    const { body, success, message } = await sendFriendRequestService(
      accountInfo.id,
      receiverId,
      auth.accessToken
    )

    if (success) {
      dispatch(setUserFriendRequestsSent(body.friendRequestsSent))

      if (cb) {
        cb()
      }
    }

    setLoading(false)
    handleMessage(message)
  }

  /**
   * Handles canceling a friend request.
   *
   * @param {string} friendRequestId - The ID of the friend request.
   * @param {string} receiverId - The ID of the receiver.
   * @returns {Promise<void>} - A Promise that resolves when the friend request is canceled.
   */
  const handleCancelFriendRequest = async (
    friendRequestId: string,
    receiverId: string,
    cb?: () => void
  ): Promise<void> => {
    setLoading(true)
    console.log("Cancel")
    setLoading(false)
  }

  return {
    loading,

    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleSendFriendRequest,
    handleCancelFriendRequest,
  }
}
