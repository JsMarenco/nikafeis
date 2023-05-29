import { ReactNode } from "react"

// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Container } from "@mui/material"

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

        <Grid xs={12}>
          <Container maxWidth="xl">{children}</Container>
        </Grid>
      </Grid>

      <ScrollTop />
    </>
  )
}
