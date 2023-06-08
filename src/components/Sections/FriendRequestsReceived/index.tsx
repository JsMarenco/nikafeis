import { useEffect, useState } from "react"

// Third-party dependencies
import { Box, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import Link from "next/link"

// Current project dependencies
import cardStyles from "@/styles/components/card"
import appRoutes from "@/constants/app/routes"
import { IFriendRequestWithPopulated } from "@/ts/interfaces/friendRequest"
import getFriendRequestsByUserIdService from "@/services/friendRequest/getFriendRequestsByUserIdService"
import { RootState } from "@/app/store"
import FriendRequestList from "@/components/Lists/FriendRequestList"
import noFriendRequestPng from "@/assets/images/bg_friend_requests.png"
import NoDataBox from "@/components/NoDataBox"
import FriendRequestSkeleton from "@/components/Skeletons/FriendRequestSkeleton"

export default function FriendRequestsReceived() {
  const [friendRequests, setFriendRequests] = useState<
    IFriendRequestWithPopulated[]
  >([])
  const { accountInfo } = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    handleFetchFriendRequests()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFetchFriendRequests = async () => {
    setLoading(true)

    const { body, success } = await getFriendRequestsByUserIdService(
      accountInfo.id,
      0,
      5
    )

    if (success) {
      if (body.friendRequest) {
        setFriendRequests((prevRequest) =>
          prevRequest.concat(body.friendRequest)
        )
      }

      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={cardStyles.container}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="subtitle1" color="text.primary" fontWeight={400}>
            Friend requests
          </Typography>

          <Link href={appRoutes.friendRequest.receive}>
            <Typography variant="body2" color="text.primary">
              View more
            </Typography>
          </Link>
        </Stack>

        <Stack spacing={1}>
          <FriendRequestList
            variant={"small"}
            friendRequests={friendRequests}
            type="received"
            loading={loading}
          />

          {loading && <FriendRequestSkeleton variant={"small"} />}
        </Stack>

        {!loading && friendRequests.length === 0 && (
          <NoDataBox
            label={"No friend requests found."}
            src={noFriendRequestPng.src}
            width={noFriendRequestPng.width}
            height={noFriendRequestPng.height}
            alt={"No friend request image"}
          />
        )}
      </Box>
    </>
  )
}
