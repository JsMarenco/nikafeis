// Third-party dependencies
import { Box, Stack, Avatar, Typography, Button } from "@mui/material"
import Link from "next/link"

// Current project dependencies
import defaultCoverPng from "@/assets/default/default_cover.png"
import FriendRequestButton from "@/components/Buttons/FriendRequestButton"
import { IProfileHeaderUI } from "@/ts/interfaces/profile"
import appRoutes from "@/constants/app/routes"

export default function ProfileHeaderUI({
  firstname,
  lastname,
  avatarUrl,
  coverUrl,
  email,
  id,
  isMainUser,
  isProfileOwnerStranger,
  isProfileOwnerFriendOfMainUser,
  hasProfileOwnerSomeFriendRequestFromMainUser,
  hasMainUserSomeFriendRequestFromProfileOwner,
  matches,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
  handleSendFriendRequest,
  handleCancelFriendRequest,
  loadingButtons,
  friendRequestId,
  userId,
  fetchUserInfo,
}: IProfileHeaderUI) {
  return (
    <>
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
            backgroundImage: `url(${
              coverUrl ? coverUrl : defaultCoverPng.src
            })`,
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
              {isMainUser && (
                <Link href={appRoutes.settings.account}>
                  <Button variant="text" color="primary">
                    Edit profile
                  </Button>
                </Link>
              )}

              {isProfileOwnerStranger && (
                <FriendRequestButton
                  onClick={() => handleSendFriendRequest(id, fetchUserInfo)}
                  matches={matches}
                  label={"Send friend request"}
                  loading={loadingButtons}
                />
              )}

              {/* Check if the users is friend */}
              {isProfileOwnerFriendOfMainUser && (
                <FriendRequestButton
                  onClick={() => console.log("delete friend")}
                  matches={matches}
                  label={"Delete friend"}
                  loading={loadingButtons}
                />
              )}

              {/* Check if the user send a friend request to main user */}
              {hasProfileOwnerSomeFriendRequestFromMainUser && (
                <>
                  <FriendRequestButton
                    onClick={() =>
                      handleCancelFriendRequest(friendRequestId, userId)
                    }
                    matches={matches}
                    label={"Cancel request"}
                    loading={loadingButtons}
                  />
                </>
              )}

              {/* Check if the main user send a friend request to this user */}
              {hasMainUserSomeFriendRequestFromProfileOwner && (
                <>
                  <FriendRequestButton
                    onClick={() =>
                      handleAcceptFriendRequest(
                        friendRequestId,
                        userId,
                        fetchUserInfo
                      )
                    }
                    matches={matches}
                    label={"Accept"}
                    loading={loadingButtons}
                  />

                  <FriendRequestButton
                    onClick={() =>
                      handleRejectFriendRequest(
                        friendRequestId,
                        userId,
                        fetchUserInfo
                      )
                    }
                    matches={matches}
                    label={"Reject"}
                    loading={loadingButtons}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
