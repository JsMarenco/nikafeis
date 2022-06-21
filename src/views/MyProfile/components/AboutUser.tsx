import React from "react"

import IAboutUser from "./interfaces/IAboutUser"

import {
  Typography
} from "@mui/material"

export default function AboutUser(props: IAboutUser) {
  const {
    name = "",
    lastName = "",
    username = "",
    description = "",
  } = props

  return (
    <>
      <Typography
        variant="h6"
        color="text.primary"
        align="center"
        sx={{ mt: 2 }}
      >
        {`${name} ${lastName}`}
      </Typography>

      <Typography
        variant="body2"
        color="text.primary"
        align="center"
        sx={{ fontSize: "0.8em" }}
      >
        {`@${username}`}
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.primary"
        align="center"
        m={0.5}
      >
        {description}
      </Typography>
    </>
  )
}
