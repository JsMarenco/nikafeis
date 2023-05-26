// Third-party dependencies
import { Card } from "@mui/material"

// Current project dependencies
import PostCardHeader from "./PostCardHeader"
import PostCardContent from "./PostCardContent"
import PostCardActions from "./PostCardActions"
import { IPostWithPopulated } from "@/ts/interfaces/post"

interface PostCardUIProps extends IPostWithPopulated {
  handleLike: () => void
  handleOpenCommentsMenu: () => void
  handleSharePost: () => void
}

export default function PostCardUI({
  author,
  title,
  content,
  postImages,
  handleLike,
  handleOpenCommentsMenu,
  handleSharePost,
  likes,
  comments,
  shares,
}: PostCardUIProps) {
  return (
    <Card
      sx={{
        maxWidth: "md",
        mx: "auto",
        backgroundImage: "none",
        borderRadius: 3,
        boxShadow: 0,
        width: "100%",
      }}
    >
      <PostCardHeader {...author} />

      <PostCardContent
        title={title}
        content={content}
        postImages={postImages}
      />

      <PostCardActions
        handleLike={handleLike}
        handleOpenCommentsMenu={handleOpenCommentsMenu}
        handleSharePost={handleSharePost}
        likes={likes}
        comments={comments}
        shares={shares}
      />
    </Card>
  )
}
