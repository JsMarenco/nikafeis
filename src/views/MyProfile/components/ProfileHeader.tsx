import React from "react"

import { containerStyles } from "../styles"

import IProfileHeader from "./interfaces/IProfileHeader"

import {
  Avatar, Box
} from "@mui/material"

export default function ProfileHeader(props: IProfileHeader) {
  const {
    avatar = "",
    cover = "",
    name = "",
    lastName = "",
  } = props

  return (
    <Box
      sx={{
        ...containerStyles,
        backgroundImage: `url(${cover})`, backgroundPosition: "center", backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => window.open(cover, "_blank")}
    >
      <Avatar
        src={avatar}
        alt={`${name} ${lastName}`}
        variant="circular"
        sizes="large"
        sx={{
          width: "100px",
          height: "100px",
          mb: "10px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }
        }}
        onClick={() => window.open(avatar, "_blank")}
      />
    </Box>
  )
}
