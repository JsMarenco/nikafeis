// Third-party dependencies
import { Box, Stack, Typography, useMediaQuery, Button } from "@mui/material/"
import Link from "next/link"

// Current project dependencies
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import Layout from "../Layout"
import comingSoonPng from "@/assets/images/bg_coming_soon.png"
import appRoutes from "@/constants/app/routes"

export default function ComingSoon() {
  useChangePageTitle("Coming Soon")
  const matches = useMediaQuery("(min-width:768px)")

  return (
    <Layout>
      <Stack
        spacing={2}
        direction={matches ? "row" : "column"}
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${comingSoonPng.src})`,
            height: matches ? "350px" : "250px",
            width: matches ? "60%" : "100%",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            flexShrink: 0,
          }}
        />

        <Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight={500}
            align={matches ? "left" : "center"}
          >
            We are under construction. Check back for an update soon.
          </Typography>

          <Link href={appRoutes.pages.home}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                mx: "auto",
                display: "block",
                width: "85%",
                borderRadius: 3,
              }}
            >
              Go home
            </Button>
          </Link>
        </Box>
      </Stack>
    </Layout>
  )
}
