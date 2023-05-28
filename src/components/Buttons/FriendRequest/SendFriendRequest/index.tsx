// Third-party dependencies
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Button, IconButton, useMediaQuery } from "@mui/material"

// Current project dependencies

export default function SendFriendRequest() {
  const matches = useMediaQuery("(min-width:600px)")

  const handleSendFriendRequest = () => {
    console.log("Added")
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
        >
          <PersonAddIcon />
        </IconButton>
      )}
    </>
  )
}
