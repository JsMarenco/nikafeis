import React from "react"

// Third-party dependencies
import { Stack, Box, Skeleton } from "@mui/material"
import cardStyles from "@/styles/components/card"
import { skeletonAnimation } from "@/utils/basic"

// Current project dependencies

export default function FriendRequestSkeletonSmall() {
  return (
    <Stack sx={{ ...cardStyles.container, p: 0 }} spacing={2}>
      <Box className="flex items-center justify-start gap-2 w-full">
        {/* user avatar */}
        <Skeleton
          animation={skeletonAnimation}
          variant="circular"
          width={45}
          height={45}
        />

        <Box flexGrow={1}>
          {/* user fullname */}
          <Skeleton
            animation={skeletonAnimation}
            variant="text"
            width="90%"
            height={25}
          />

          {/* time ago */}
          <Skeleton
            animation={skeletonAnimation}
            variant="text"
            width="70%"
            height={25}
          />
        </Box>
      </Box>

      <Box className="flex items-center justify-center gap-2 w-full">
        {/* accept button */}
        <Skeleton
          animation={skeletonAnimation}
          variant="rectangular"
          width={100}
          height={35}
          sx={cardStyles.button_large}
        />

        {/* reject button */}
        <Skeleton
          animation={skeletonAnimation}
          variant="rectangular"
          width={100}
          height={35}
          sx={cardStyles.button_large}
        />
      </Box>
    </Stack>
  )
}

export const FriendRequestSkeletonSmallList = () => {
  return (
    <Stack spacing={2}>
      <FriendRequestSkeletonSmall />
      <FriendRequestSkeletonSmall />
      <FriendRequestSkeletonSmall />
    </Stack>
  )
}
