import { useContext, useState } from "react"

// Third-party dependencies
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Button, IconButton, useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

// Current project dependencies
import { AppMessageContext } from "@/context/AppMessageContext"
import { RootState } from "@/app/store"
import sendFriendRequestService from "@/services/friendRequest/sendFriendRequestService"
import { setUserFriendRequestsSent } from "@/app/slices/user"

interface SendFriendRequestProps {
  receiverId: string
}

export default function SendFriendRequest({
  receiverId,
}: SendFriendRequestProps) {
  const matches = useMediaQuery("(min-width:600px)")
  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(AppMessageContext)
  const { accountInfo, auth } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleSendFriendRequest = async () => {
    setLoading(true)

    const { body, success, message } = await sendFriendRequestService(
      accountInfo.id,
      receiverId,
      auth.accessToken
    )

    if (success) {
      dispatch(setUserFriendRequestsSent(body.friendRequestsSent))
    }

    setLoading(false)
    handleMessage(message)
  }

  return (
    <>
      {matches ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleSendFriendRequest}
          sx={{
            py: 1,
            borderColor: "text.primary",
            color: "text.primary",
          }}
          disableElevation
          disabled={loading}
        >
          Add friend
        </Button>
      ) : (
        <IconButton
          aria-label="Send friend request"
          onClick={handleSendFriendRequest}
          sx={{
            borderRadius: 1,
            border: "1px solid",
            borderColor: "text.primary",
          }}
          disabled={loading}
        >
          <PersonAddIcon />
        </IconButton>
      )}
    </>
  )
}
