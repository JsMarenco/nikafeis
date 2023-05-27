// Third-party dependencies
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material"
import Link from "next/link"

// Current project dependencies
import { ICommentWithPopulated } from "@/ts/interfaces/comment"
import appRoutes from "@/constants/app/routes"

export default function CommentCard({
  author,
  content,
  createdAt,
}: ICommentWithPopulated) {
  const { firstname, lastname, avatarUrl, username } = author

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label={`${firstname} ${lastname}'s avatar`}
            src={avatarUrl}
            alt={`${firstname} ${lastname}'s avatar`}
          >
            {firstname.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Link href={appRoutes.profile.view(username)}>
            {`${firstname} ${lastname}`}
          </Link>
        }
        subheader={`${createdAt}`}
      />

      <CardContent>
        <Typography variant="subtitle1" color="text.primary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}
