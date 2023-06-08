import { ReactNode } from "react"

// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Container, IconButton, Stack, Typography } from "@mui/material"
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined"

// Current project dependencies
import Header from "@/components/Header"
import ScrollTop from "@/components/Buttons/ScrollTop"
import cardStyles from "@/styles/components/card"
import { useRouter } from "next/router"
import appRoutes from "@/constants/app/routes"

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <>
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12}>
          <Header />
        </Grid>

        <Grid xs={12}>
          <Container maxWidth="xl" sx={{ mb: 2 }}>
            <Stack spacing={2}>
              {router.pathname !== appRoutes.pages.home && (
                <Box
                  sx={{ ...cardStyles.container }}
                  className="flex items-center justify-start gap-3"
                >
                  <IconButton onClick={() => router.back()}>
                    <ArrowBackIosNewOutlinedIcon />
                  </IconButton>

                  <Typography
                    variant="h4"
                    color="text.primary"
                    align="left"
                    fontWeight={500}
                  >
                    Back
                  </Typography>
                </Box>
              )}

              <Box>{children}</Box>
            </Stack>
          </Container>
        </Grid>
      </Grid>

      <ScrollTop />
    </>
  )
}
