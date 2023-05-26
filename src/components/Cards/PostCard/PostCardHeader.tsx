// Third-party dependencies
import { Avatar, CardHeader, Typography } from "@mui/material"

// Current project dependencies
import { IPostWithPopulated } from "@/ts/interfaces/post"
import Link from "next/link"
import appRoutes from "@/constants/app/routes"

export default function PostCardHeader({
  firstname,
  lastname,
  username,
  avatarUrl,
}: IPostWithPopulated["author"]) {
  return (
    <CardHeader
      avatar={
        <Link href={appRoutes.profile.view(username)}>
          <Avatar
            src={avatarUrl}
            alt={`${firstname} ${lastname}'s avatar`}
            aria-label={`${firstname} ${lastname}'s avatar`}
          >
            {firstname.charAt(0).toLocaleUpperCase()}
          </Avatar>
        </Link>
      }
      title={
        <Link href={appRoutes.profile.view(username)}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={{
              "&:hover": {
                color: "text.secondary",
                textDecoration: "underline",
              },
            }}
          >
            {`${firstname} ${lastname}`}
          </Typography>
        </Link>
      }
    />
  )
}
