import { ReactNode } from "react"

// Third-party dependencies

import cardStyles from "@/styles/components/card"
import { Box, Typography } from "@mui/material"

// Current project dependencies

interface SettingSectionProps {
  label: string
  children: ReactNode
}

export default function SettingSection({
  label,
  children,
}: SettingSectionProps) {
  return (
    <Box>
      <Typography
        variant="subtitle1"
        color="text.primary"
        mb={0.5}
        fontWeight={400}
      >
        {label}
      </Typography>

      <Box sx={cardStyles.container}>{children}</Box>
    </Box>
  )
}
