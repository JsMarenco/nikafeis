// Third-party dependencies
import { Avatar, Box, Stack, Typography, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"

// Current project dependencies
import { IUser } from "@/ts/interfaces/user"
import SendFriendRequest from "../Buttons/FriendRequest/SendFriendRequest"
import { RootState } from "@/app/store"
import defaultCoverPng from "@/assets/default/default_cover.png"

type ProfileHeaderPropsPicked =
  | "id"
  | "firstname"
  | "lastname"
  | "avatarUrl"
  | "username"
  | "coverUrl"
  | "email"

interface ProfileHeaderProps extends Pick<IUser, ProfileHeaderPropsPicked> {}

export default function ProfileHeader({
  firstname,
  lastname,
  avatarUrl,
  coverUrl,
  email,
  id,
}: ProfileHeaderProps) {
  const matches = useMediaQuery("(min-width:600px)")
  const { accountInfo, relationships } = useSelector(
    (state: RootState) => state.user
  )

  return (
    <Box
      id="profile_header-conatiner"
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 2,
        width: "100%",
      }}
    >
      <Box
        id="profile_header-cover-container"
        sx={{
          backgroundImage: `url(${coverUrl ? coverUrl : defaultCoverPng.src})`,
          borderRadius: 3,
          overflow: "hidden",
          width: "100%",
          minHeight: "300px",
          maxHeight: "400px",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: 5,
          bgcolor: "#ffffff",
        }}
      />

      <Stack
        id="profile_header-user-info"
        direction={matches ? "row" : "column"}
        alignItems="baseline"
        justifyContent="space-between"
        spacing={3}
        sx={{
          position: "relative",
          // Move the stack 40px above its original position
          top: matches ? "-30px" : "-65px",
          mx: 1,
        }}
      >
        <Avatar
          src={avatarUrl}
          alt={`${firstname} ${lastname}'s profile photo`}
          sx={{
            width: 130,
            height: 130,
            mx: "auto",
            boxShadow: 5,
            fontSize: 85,
          }}
        >
          {firstname.charAt(0).toUpperCase()}
        </Avatar>

        <Stack
          direction={matches ? "row" : "column"}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Box>
            <Typography
              variant="h6"
              color="text.primary"
              align={matches ? "left" : "center"}
            >
              {`${firstname} ${lastname}`}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              align={matches ? "left" : "center"}
            >
              {email}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="start"
            spacing={1}
          >
            {accountInfo.id !== id && !relationships.friends.includes(id) && (
              <SendFriendRequest />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
