import { ReactNode } from "react"

// Third-party dependencies
import { CardActions, Button, useMediaQuery } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CommentIcon from "@mui/icons-material/Comment"
import ShareIcon from "@mui/icons-material/Share"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"

// Current project dependencies
import { IPostWithPopulated } from "@/ts/interfaces/post"

interface PostCardActionsProps
  extends Pick<IPostWithPopulated, "likes" | "comments" | "shares"> {
  handleLike: () => void
  handleOpenCommentsMenu: () => void
  handleSharePost: () => void
}

export default function PostCardActions({
  handleLike,
  handleOpenCommentsMenu,
  handleSharePost,
  likes,
  comments,
  shares,
}: PostCardActionsProps) {
  const { accountInfo } = useSelector((state: RootState) => state.user)

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
        icon={
          <FavoriteIcon
            color={likes.includes(accountInfo.id) ? "secondary" : "primary"}
          />
        }
        label={`${likes.length} Likes`}
      />

      <ActionButton
        handleOnClick={handleOpenCommentsMenu}
        icon={<CommentIcon />}
        label={`${comments.length} Comments`}
      />

      <ActionButton
        handleOnClick={handleSharePost}
        icon={<ShareIcon />}
        label={`${shares} Shares`}
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
  const matches = useMediaQuery("(min-width:600px)")

  return (
    <>
      <Button
        variant="text"
        color="primary"
        startIcon={icon}
        onClick={handleOnClick}
      >
        {matches ? label : label.split(" ")[0]}
      </Button>
    </>
  )
}
