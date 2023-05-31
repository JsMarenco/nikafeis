// Third-party dependencies
import { Box, Stack, Avatar, Typography } from "@mui/material"
import Link from "next/link"

// Current project dependencies
import appRoutes from "@/constants/app/routes"
import cardStyles from "@/styles/components/card"
import {
  IFriendRequestType,
  IFriendRequestWithPopulated,
} from "@/ts/interfaces/friendRequest"
import { IBasicUserInfo } from "@/ts/interfaces/user"
import { convertDate } from "@/utils/basic"
import FriendRequestButton from "@/components/Buttons/FriendRequestButton"
import { IUseFriendRequest } from "@/ts/interfaces/hooks/useFriendRequest"

type picked = "date"

interface FriendRequestCardUIProps
  extends Pick<IFriendRequestWithPopulated, picked>,
    IUseFriendRequest {
  friendRequestId: string
  user: IBasicUserInfo
  type: IFriendRequestType
  matches: boolean
}

export default function FriendRequestCardUI({
  user,
  date,
  type,
  matches,
  loading,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
  handleCancelFriendRequest,
}: FriendRequestCardUIProps) {
  const { firstname, lastname, username, avatarUrl } = user

  return (
    <>
      <Box sx={{ ...cardStyles.container, bgcolor: "background.paper", p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-start"
          spacing={2}
        >
          <Link href={appRoutes.profile.view(username)}>
            <Avatar
              src={avatarUrl}
              alt={`${firstname} ${lastname}'s avatar`}
              aria-label={`${firstname} ${lastname}'s avatar`}
            >
              {firstname.charAt(0).toLocaleUpperCase()}
            </Avatar>
          </Link>

          <Box>
            <Link href={appRoutes.profile.view(username)}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: matches ? "95%" : "135px",
                }}
              >
                {`${firstname} ${lastname}`}
              </Typography>
            </Link>

            <Typography variant="body1" color="text.primary">
              {convertDate(date as unknown as string)}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1.5}
          sx={{ mt: 1.5 }}
        >
          {type === "received" && (
            <>
              <FriendRequestButton
                onClick={handleAcceptFriendRequest}
                matches={matches}
                loading={loading}
                label="Accept"
              />

              <FriendRequestButton
                onClick={handleRejectFriendRequest}
                matches={matches}
                loading={loading}
                label="Reject"
              />
            </>
          )}

          {type === "sent" && (
            <>
              <FriendRequestButton
                onClick={handleCancelFriendRequest}
                matches={matches}
                loading={loading}
                label="Cancel"
              />
            </>
          )}
        </Stack>
      </Box>
    </>
  )
}
