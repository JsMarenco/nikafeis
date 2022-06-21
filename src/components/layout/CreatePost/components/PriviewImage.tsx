import React from "react"

interface IImage {
  src: string,
  clearImage: () => void,
}

import { IconButton, Stack } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

export default function PriviewImage(props: IImage) {
  const { 
    src = "",
    clearImage,
  } = props
  
  return (
    <>
      {
        src && (
          <>
            <Stack
              spacing={1}
            >
              <IconButton
                aria-label="delete"
                onClick={clearImage}
                sx={{
                  position: "absolute",
                  ml: -2,
                  mt: -1,
                }}
              >
                <ClearIcon />
              </IconButton>

              <img
                src={src}
                alt="preview"
                style={{
                  width: "50%",
                  borderRadius: "15px",
                }}
              />
            </Stack>
          </>
        )
      }
    </>
  )
}
