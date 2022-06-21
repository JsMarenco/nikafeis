import React, { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../context/GlobalState"

import { LoadingContainerStyles } from "./styles"

import { changeTitle } from "../../services"

import CreatePost from "../../components/layout/CreatePost"
import Header from "../../components/layout/Header"
import Post from "../../components/layout/Posts"

import {
  Typography, CircularProgress, Box, Divider
} from "@mui/material"

export default function Home() {
  const { user } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    changeTitle("Home")

    if (user.id === "") {
      navigate("/login")
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <>
      {
        loading ? (
          <Box sx={LoadingContainerStyles}>
            <CircularProgress
              size={50}
            />

            <Typography
              variant="subtitle1"
              color="text.primary"
              mt={2}
            >
              Loading ...
            </Typography>
          </Box>
        ) : (
          <>
            <Header />

            <CreatePost />

            <Divider sx={{ m: 1, mb: 2 }} />

            <Post />
          </>
        )
      }
    </>
  )
}
