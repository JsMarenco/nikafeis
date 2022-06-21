import React from "react"

import {
  Typography, Button
} from "@mui/material"

export default function ForgotPasswordButton() {
  return (
    <Typography
      variant="caption"
      color="text.primary"
      mt={2}
    >
      forgot password?

      <Button
        variant="text"
        color="primary"
        size="small"
        sx={{ ml: 1 }}
        href="/forgot-password"
      >
        click here
      </Button>
    </Typography>

  )
}
