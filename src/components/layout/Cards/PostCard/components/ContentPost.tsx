import React from "react"

import ContentPostInterface from "./interfaces/ContentPost"

import {
  Stack, Typography, Box
} from "@mui/material"

export default function ContentPost(props: ContentPostInterface) {
  const {
    title = "",
    body = "",
    image_src = "",
  } = props

  return (
    <Stack spacing={2}>
      <Typography
        variant="subtitle1"
        color="text.primary"
      >
        {title}
      </Typography>

      <Typography
        variant="caption"
        color="text.primary"
      >
        {body}
      </Typography>

      {
        image_src && (
          <Box
            sx={{
              width: "100%",
              maxWidth: "auto",
            }}
          >
            <img
              src={image_src}
              alt={"This is a post in nikafeis"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        )
      }
    </Stack>
  )
}
