import React from "react"
import { useNavigate } from "react-router-dom"

import { userCardContainer } from "./styles"

import IBaseUser from "../../interfaces/IBaseUser"

import {
  Avatar, Box, IconButton, Stack, Typography, Tooltip
} from "@mui/material"

import MessageIcon from "@mui/icons-material/Message"

export default function BaseUserCard(props: IBaseUser) {
  const {
    name = "",
    lastName = "",
    username = "",
    avatar = "",
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
      </Box>

      <Stack
        spacing={0.5}
        direction="row"
        flexWrap="wrap"
      >
        <IconButton>
          <MessageIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}
