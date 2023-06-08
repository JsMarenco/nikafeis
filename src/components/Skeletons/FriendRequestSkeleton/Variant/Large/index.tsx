import React from "react"

// Third-party dependencies
import { Grid, Skeleton, Stack } from "@mui/material"

// Current project dependencies
import cardStyles from "@/styles/components/card"
import { skeletonAnimation } from "@/utils/basic"

export default function FriendRequestSkeletonLarge() {
  return (
    <Stack
      sx={cardStyles.container}
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {/* user avatar */}
      <Skeleton
        animation={skeletonAnimation}
        variant="circular"
        sx={{ width: 130, height: 130 }}
      />

      {/* user fullname */}
      <Skeleton
        animation={skeletonAnimation}
        variant="text"
        width="90%"
        height={25}
      />

      {/* user username */}
      <Skeleton
        animation={skeletonAnimation}
        variant="text"
        width="65%"
        height={20}
      />

      {/* accept button */}
      <Skeleton
        animation={skeletonAnimation}
        variant="rectangular"
        sx={{ ...cardStyles.button_large, height: 35, mb: 0.5 }}
      />

      {/* reject button */}
      <Skeleton
        animation={skeletonAnimation}
        variant="rectangular"
        sx={{ ...cardStyles.button_large, height: 35, mb: 0.5 }}
      />
    </Stack>
  )
}

export const FriendRequestSkeletonLargeList = () => {
  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FriendRequestSkeletonLarge />
        </Grid>
      </Grid>
    </>
  )
}
