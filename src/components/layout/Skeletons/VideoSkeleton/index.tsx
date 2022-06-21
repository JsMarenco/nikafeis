import React from "react"

import { avatarStyles, headerStyles, contentStyles, commentStyles } from "../styles"

import {
  Box, Divider, Paper, Skeleton
} from "@mui/material"

export default function VideoSkeleton() {
  return (
    <Paper sx={contentStyles}>
      <Box sx={headerStyles}>
        <Skeleton animation="pulse" variant="circular" sx={avatarStyles} />

        <Box sx={{ width: "100%" }}>
          <Skeleton animation="pulse" variant="text" sx={{ width: "100%" }} height={25} />
          <Skeleton animation="pulse" variant="text" sx={{ width: "100%" }} height={20} />
        </Box>

      </Box>

      <Skeleton
        animation="pulse"
        variant="text"
        sx={{ width: "100%", height: "12em", m: 0 }}
      />

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Box sx={commentStyles}>
        <Skeleton
          animation="pulse"
          variant="text"
          sx={{ width: "80px", height: 20, ml: 0.5, mr: 0.5 }}
        />

        <Skeleton
          animation="pulse"
          variant="text"
          sx={{ width: "80px", height: 20, ml: 0.5, mr: 0.5 }}
        />

        <Skeleton
          animation="pulse"
          variant="text"
          sx={{ width: "80px", height: 20, ml: 0.5, mr: 0.5 }}
        />
      </Box>
    </Paper>
  )
}
