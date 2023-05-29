import { useEffect, useState } from "react"

// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

// Current project dependencies
import ProfileHeader from "@/components/Profile/ProfileHeader"
import Layout from "@/components/Layout"
import ProfileAbout from "@/components/Profile/ProfileAbout"
import { Box, Stack, Typography, Button } from "@mui/material"
import CreatePost from "@/components/CreatePost"
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import { IUser } from "@/ts/interfaces/user"
import getUserByUsernameService from "@/services/user/getUserByUsernameService"
import userNotFoundPng from "@/assets/images/bg_404.png"
import Link from "next/link"
import appRoutes from "@/constants/app/routes"
import { RootState } from "@/app/store"
import ProfilePosts from "@/components/Sections/ProfilePosts"

export default function UserProfile() {
  const router = useRouter()
  const { username } = router.query
  useChangePageTitle(username ? (username as string) : "Profile")

  const [user, setUser] = useState<IUser>({} as IUser)
  const [loading, setLoading] = useState(true)
  const [userFound, setUserFound] = useState(true)
  const { accountInfo } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      const { body, success } = await getUserByUsernameService(
        username as string
      )

      if (success) {
        setUser(body)
      } else {
        setUserFound(false)
      }

      setLoading(false)
    }

    fetchData()
  }, [username])

  return (
    <>
      <Layout>
        <Grid container spacing={2} disableEqualOverflow>
          {!loading && userFound && (
            <>
              <Grid xs={12}>
                <ProfileHeader
                  id={user.id}
                  email={user.email}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  avatarUrl={user.avatarUrl}
                  username={user.username}
                  coverUrl={user.coverUrl}
                />
              </Grid>

              <Grid xs={12} md={5}>
                <Stack spacing={2}>
                  <ProfileAbout
                    description={user.description}
                    posts={user.posts}
                    createdAt={user.createdAt}
                    friends={user.friends}
                  />
                </Stack>
              </Grid>

              <Grid xs={12} md={7}>
                <Stack spacing={2}>
                  {accountInfo.username === username && <CreatePost />}

                  <ProfilePosts username={user.username} />
                </Stack>
              </Grid>
            </>
          )}

          {!loading && !userFound && (
            <Grid xs={12}>
              <Box
                sx={{
                  backgroundImage: `url(${userNotFoundPng.src})`,
                  height: "350px",
                  width: "auto",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              />

              <Typography
                variant="h5"
                color="text.primary"
                fontWeight={400}
                align="center"
                my={2}
              >
                User not found
              </Typography>

              <Link href={appRoutes.home}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    maxWith: "xs",
                    mx: "auto",
                    display: "block",
                  }}
                >
                  Back home
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Layout>
    </>
  )
}
