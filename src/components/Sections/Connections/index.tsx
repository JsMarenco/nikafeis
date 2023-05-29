// Third-party dependencies
import { Box, Stack, Typography } from "@mui/material"

// Current project dependencies
import cardStyles from "@/styles/components/card"
import Link from "next/link"
import appRoutes from "@/constants/app/routes"

export default function Connections() {
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
            Connections
          </Typography>

          <Typography variant="body2" color="text.primary">
            <Link href={appRoutes.pages.explore}>View more</Link>
          </Typography>
        </Stack>
      </Box>
    </>
  )
}
