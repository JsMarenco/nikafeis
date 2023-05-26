// Third-party dependencies
import { CardContent, Typography } from "@mui/material"

// Current project dependencies
import { IPostWithPopulated } from "@/ts/interfaces/post"

type PostCardContentPropsPicked = "title" | "content" | "postImages"

interface PostCardContentProps
  extends Pick<IPostWithPopulated, PostCardContentPropsPicked> {}

export default function PostCardContent({
  title,
  content,
}: PostCardContentProps) {
  return (
    <CardContent>
      <Typography
        variant="h6"
        fontWeight={300}
        color="text.secondary"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography variant="body2" fontWeight={300}>
        {content}
      </Typography>
    </CardContent>
  )
}
