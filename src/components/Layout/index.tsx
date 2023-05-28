import { ReactNode } from "react"

// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/material"

// Current project dependencies
import Header from "@/components/Header"
import ScrollTop from "@/components/Buttons/ScrollTop"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12}>
          <Header />
        </Grid>

        <Grid
          sm={3}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        ></Grid>

        <Grid xs={12} sm={9}>
          <Box>{children}</Box>
        </Grid>
      </Grid>

      <ScrollTop />
    </>
  )
}
