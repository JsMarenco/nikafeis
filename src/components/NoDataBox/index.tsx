import { ReactNode } from "react"

// Third-party dependencies
import { Box, Stack, Typography } from "@mui/material"
import Image from "next/image"

// Current project dependencies

interface NoDataBoxProps {
  label: string
  width: number
  height: number
  alt: string
  src: string
  children?: ReactNode
}

export default function NoDataBox({
  label,
  width,
  height,
  alt,
  src,
  children,
}: NoDataBoxProps) {
  return (
    <Stack spacing={2}>
      <Box
        sx={{
          maxWidth: "500px",
          width: "90%",
          mx: "auto",
        }}
      >
        <Image src={src} alt={alt} width={width} height={height} />
      </Box>

      <Typography
        variant="subtitle1"
        color="text.primary"
        align="center"
        fontWeight={400}
      >
        {label}
      </Typography>

      <Box>{children}</Box>
    </Stack>
  )
}
