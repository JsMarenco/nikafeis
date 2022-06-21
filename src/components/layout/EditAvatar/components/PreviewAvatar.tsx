import React, { useContext } from "react"

import { GlobalContext } from "../../../../context/GlobalState"

interface IAvatarProps {
  src: string
}

import {
  Avatar, Stack, Tooltip, Typography

} from "@mui/material"

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

export default function PreviewAvatar(props: IAvatarProps) {
  const {
    src = ""
  } = props

  const { user } = useContext(GlobalContext)

  return (
    <>
      {
        src && (
          <>
            <Typography
              variant="subtitle1"
              color="text.primary"
              align="center"
              mb={3}
            >
              Preview
            </Typography>

            <Stack
              spacing={2}
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              mb={3}
            >

              <Tooltip title="Your old avatar" arrow>
                <Avatar
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  sx={{
                    width: "90px",
                    height: "90px",
                  }}
                />
              </Tooltip>

              <ArrowForwardIosIcon
                color="primary"
              />

              <Tooltip title="Your new avatar" arrow>
                <Avatar
                  src={src}
                  alt={`${user.name}'s avatar`}
                  sx={{
                    width: "90px",
                    height: "90px",
                  }}
                />
              </Tooltip>
            </Stack>
          </>
        )
      }
    </>
  )
}
