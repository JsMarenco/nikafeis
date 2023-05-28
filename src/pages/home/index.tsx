// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Stack } from "@mui/material"

// Current project dependencies
import CreatePost from "@/components/CreatePost"
import PostsList from "@/components/Lists/PostsList"
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import appTitles from "@/ts/enums/appTitles"
import Layout from "@/components/Layout"

export default function Home() {
  useChangePageTitle(appTitles.home)

  return (
    <Layout>
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12} md={8}>
          <Stack spacing={2}>
            <CreatePost />

            <PostsList />
          </Stack>
        </Grid>

        <Grid xs={0} md={3}></Grid>
      </Grid>
    </Layout>
  )
}
