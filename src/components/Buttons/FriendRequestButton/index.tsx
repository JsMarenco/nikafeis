// Third-party dependencies
import { Button } from "@mui/material"

// Current project dependencies
import cardStyles from "@/styles/components/card"

interface FriendRequestButtonProps {
  onClick: any
  matches: boolean
  label: string
  loading: boolean
}

export default function FriendRequestButton({
  onClick,
  loading,
  matches,
  label,
}: FriendRequestButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={matches ? cardStyles.button_large : cardStyles.button_small}
      disableElevation
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </Button>
  )
}
