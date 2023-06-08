import { useEffect, useState } from "react"

// Third-party dependencies
import { Stack, Button } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"

// Current project dependencies
import ProfileHeader from "@/components/Profile/ProfileHeader"
import Layout from "@/components/Layout"
import ProfileAbout from "@/components/Profile/ProfileAbout"
import CreatePost from "@/components/CreatePost"
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import { IUser } from "@/ts/interfaces/user"
import getUserByUsernameService from "@/services/user/getUserByUsernameService"
import userNotFoundPng from "@/assets/images/bg_user_not_found.png"
import appRoutes from "@/constants/app/routes"
import { RootState } from "@/app/store"
import ProfilePosts from "@/components/Sections/ProfilePosts"
import { setUser as setMainUser } from "@/app/slices/user"
import NoDataBox from "@/components/NoDataBox"

export default function UserProfile() {
  const router = useRouter()
  const { username } = router.query
  useChangePageTitle(username ? (username as string) : "Profile")

  const [user, setUser] = useState<IUser>({} as IUser)
  const [loading, setLoading] = useState(true)
  const [userFound, setUserFound] = useState(true)
  const { accountInfo } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  const fetchUserInfo = async () => {
    const { body, success } = await getUserByUsernameService(username as string)

    if (body.id === accountInfo.id) {
      dispatch(setMainUser(body))
    }

    if (success) {
      setUser(body)
    } else {
      setUserFound(false)
    }

    setLoading(false)
  }

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
                  loading={loading}
                  coverUrl={user.coverUrl}
                  friendRequests={user.friendRequests}
                  friendRequestsSent={user.friendRequestsSent}
                  fetchUserInfo={fetchUserInfo}
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
              <NoDataBox
                label={"User not found."}
                src={userNotFoundPng.src}
                width={userNotFoundPng.width}
                height={userNotFoundPng.height}
                alt={"User not found image"}
              >
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
              </NoDataBox>
            </Grid>
          )}
        </Grid>
      </Layout>
    </>
  )
}
