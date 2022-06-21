import React from "react"

import { useNavigate } from "react-router-dom"

import { userCardContainer } from "./styles"

import { convertDate } from "../../../../utils"

import IFriendRequest from "../../interfaces/IFriendRequest"

import {
  Avatar, Box, IconButton, Stack, Typography, Tooltip
} from "@mui/material"

import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

export default function UserCard(props: IFriendRequest) {
  const {
    name = "",
    lastName = "",
    username = "",
    avatar = "",
    requestedAt = "",
  } = props

  const navigate = useNavigate()

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={userCardContainer}
    >
      <Avatar
        src={avatar}
        alt={`${name} ${lastName}`}
      />

      <Box
        flexGrow={1}
      >
        <Tooltip title="View profile" arrow>
          <Typography
            variant="subtitle1"
            color="text.primary"
            onClick={() => navigate(`/profile/${username}`)}
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              display: "inline-block",
            }}
          >
            {`${name} ${lastName}`}
          </Typography>
        </Tooltip>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {`${convertDate(requestedAt)}`}
        </Typography>
      </Box>

      <Stack
        spacing={0.5}
        direction="row"
        flexWrap="wrap"
      >
        <IconButton>
          <CheckIcon />
        </IconButton>

        <IconButton>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}
