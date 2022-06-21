import React from "react"

import { Skeleton, Stack } from "@mui/material"
import { userCardContainer } from "../../Cards/UserCard/styles"

export default function UserCardSkeleton() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={userCardContainer}
    >
      <Skeleton variant="circular" width={40} height={40} />

      <Skeleton animation="pulse" variant="text" sx={{ width: "100%" }} height={20} />
    </Stack>
  )
}
