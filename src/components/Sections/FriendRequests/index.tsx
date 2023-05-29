// Third-party dependencies
import { Box, Stack, Typography } from "@mui/material"

// Current project dependencies
import cardStyles from "@/styles/components/card"
import Link from "next/link"
import appRoutes from "@/constants/app/routes"

export default function FriendRequests() {
  return (
    <>
      <Box sx={cardStyles.container}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" color="text.primary" fontWeight={400}>
            Friend requests
          </Typography>

          <Typography variant="body2" color="text.primary">
            <Link href={appRoutes.pages.friends}>View more</Link>
          </Typography>
        </Stack>
      </Box>
    </>
  )
}
