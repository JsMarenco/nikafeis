import { ReactNode } from "react"

// Third-party dependencies
import { CardActions, Button } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CommentIcon from "@mui/icons-material/Comment"
import ShareIcon from "@mui/icons-material/Share"

// Current project dependencies

interface PostCardActionsProps {
  handleLike: () => void
  handleOpenCommentsMenu: () => void
  handleSharePost: () => void
}

export default function PostCardActions({
  handleLike,
  handleOpenCommentsMenu,
  handleSharePost,
}: PostCardActionsProps) {
  return (
    <CardActions
      sx={{
        width: "100%",
        justifyContent: "space-between",
        maxWidth: "md",
        mx: "auto",
      }}
    >
      <ActionButton
        handleOnClick={handleLike}
        icon={<FavoriteIcon />}
        label="Like"
      />

      <ActionButton
        handleOnClick={handleOpenCommentsMenu}
        icon={<CommentIcon />}
        label="Comments"
      />

      <ActionButton
        handleOnClick={handleSharePost}
        icon={<ShareIcon />}
        label="Share"
      />
    </CardActions>
  )
}

interface ActionButtonProps {
  icon: ReactNode
  label: string
  handleOnClick: () => void
}

const ActionButton = ({ icon, label, handleOnClick }: ActionButtonProps) => {
  return (
    <>
      <Button
        variant="text"
        color="primary"
        startIcon={icon}
        onClick={handleOnClick}
      >
        {label}
      </Button>
    </>
  )
}
