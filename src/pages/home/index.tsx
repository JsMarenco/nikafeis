// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import { Stack } from "@mui/material"

// Current project dependencies
import CreatePost from "@/components/CreatePost"
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import appTitles from "@/ts/enums/appTitles"
import Layout from "@/components/Layout"
import RecentPosts from "@/components/Sections/RecentPosts"
import FriendRequestsReceived from "@/components/Sections/FriendRequestsReceived"
import Connections from "@/components/Sections/Connections"
import Link from "next/link"

export default function Home() {
  useChangePageTitle(appTitles.home)

  return (
    <Layout>
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12} md={8}>
          <Stack spacing={2}>
            <CreatePost />
            <Link href="/p/jsjs">ssm</Link>

            <RecentPosts />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={2}>
            <FriendRequestsReceived />

            <Connections />
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  )
}
