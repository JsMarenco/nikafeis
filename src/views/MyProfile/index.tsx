import React, { useContext, useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { GlobalContext } from "../../context/GlobalState"

import { changeTitle } from "../../services"
import { getUserByUsername } from "../../services/user"

import IUserInfo from "../../components/layout/interfaces/IUserInfo"

import Header from "../../components/layout/Header"
import Posts from "../../components/layout/Posts"
import VisitorOption from "../../components/layout/ProfileOptions/VisitorOptions"
import UserOptions from "../../components/layout/ProfileOptions/UserOptions"
import ProfileHeader from "./components/ProfileHeader"
import AboutUser from "./components/AboutUser"

import {
  Container, Box, Typography, Divider, CircularProgress, Stack
} from "@mui/material"

export default function MyProfile() {
  const { user } = useContext(GlobalContext)

  const navigate = useNavigate()

  const { userName } = useParams()

  const location = window.location.pathname

  const [userInfo, setUserInfo] = useState({} as IUserInfo)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userName === "me" || userName === user.username) {
      getUserByUsername(user.username)
        .then((res) => {
          setUserInfo(res)

          changeTitle(`${res.name} ${res.lastName}`)

          navigate("/profile/me")

          setLoading(false)
        })
        .catch((err) => {
          console.log(err)

          navigate("/user-not-found")
        })
    }

    if (userName !== "me" && userName !== user.username) {
      getUserByUsername(userName as string)
        .then((res) => {
          setUserInfo(res)

          changeTitle(`${res.name} ${res.lastName}`)

          setLoading(false)
        })
        .catch((err) => {
          console.log(err)

          navigate("/user-not-found")
        })
    }
  }, [location])

  return (
    <>
      <Header />

      {
        loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "0 auto",
              marginTop: "35vh",
            }}
          >
            <CircularProgress size={50} />

            <Typography
              variant="h6"
              color="text.primary"
              mt={2}
            >
              Loading ...
            </Typography>
          </Box>
        ) : (
          <>
            <ProfileHeader
              avatar={userInfo.avatar}
              cover={userInfo.cover}
              name={userInfo.name}
              lastName={userInfo.lastName}
            />

            <AboutUser
              name={userInfo.name}
              lastName={userInfo.lastName}
              username={userInfo.username}
              description={userInfo.description}
            />

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
              mt={2}
              mb={3}
            >
              {
                userName === "me" || userName === user.username ? (
                  <UserOptions />
                ) : (
                  <VisitorOption />
                )
              }
            </Stack>

            <Container maxWidth="lg">
              <Divider sx={{ mt: 1, mb: 2 }} />

              <Typography
                variant="h6"
                color="text.primary"
              >
                Latest posts
              </Typography>

              <Divider sx={{ mt: 1, mb: 2 }} />
            </Container>

            <Posts />
          </>
        )
      }
    </>
  )
}
