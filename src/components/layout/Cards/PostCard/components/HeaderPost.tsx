import React from "react"

import { useNavigate } from "react-router-dom"

import {
  headerStyles,
  avatarStyles
} from "../../styles"

import { convertDate } from "../../../../../utils"

import HeaderPostInterface from "./interfaces/HeaderPost"

import {
  Avatar, Box, Tooltip, Typography
} from "@mui/material"

export default function HeaderPost(props: HeaderPostInterface) {
  const navigate = useNavigate()

  const {
    name = "",
    lastName = "",
    avatar = "",
    username = "",

    created_at = "",
    updated_at = "",
  } = props

  return (
    <Box sx={headerStyles}>
      <Tooltip title="View profile" arrow>
        <Avatar
          src={avatar}
          alt={name}
          sx={avatarStyles}
          onClick={() => navigate(`/profile/${username}`)}
        />
      </Tooltip>

      <Box sx={{ width: "100%" }}>
        <Tooltip title="View profile" arrow>
          <Typography
            variant="subtitle1"
            color="text.primary"
            onClick={() => navigate(`/profile/${username}`)}
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              display: "inline-block",
              width: "auto",
              "&:hover": {
                color: "text.secondary",
              }
            }}
          >
            {`${name} ${lastName}`}
          </Typography>
        </Tooltip>

        <Typography variant="subtitle2" color="text.primary">
          {
            updated_at === created_at ? (
              convertDate(created_at)
            ) : (
              `${convertDate(created_at)} - edited ${convertDate(updated_at)}`
            )
          }
        </Typography>
      </Box>
    </Box>
  )
}