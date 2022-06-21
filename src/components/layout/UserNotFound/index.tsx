import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { changeTitle } from "../../../services"

import Header from "../Header"

import {
  Box, Button, Container, Stack, Typography
} from "@mui/material"

import HomeIcon from "@mui/icons-material/Home"
import ErrorIcon from "@mui/icons-material/Error"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

export default function UserNotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    changeTitle("User Not Found")
  }, [])

  return (
    <>
      <Header />

      <Container maxWidth="md">
        <ErrorIcon
          sx={{
            fontSize: "3rem",
            display: "block",
            margin: "auto",
            mt: 4
          }}
          color="primary"
        />

        <Box mt={5}>
          <Stack spacing={4}>
            <Typography
              variant="h4"
              component="h1"
              color="text.primary"
              align="center"
            >
              User Not Found
            </Typography>

            <Typography
              variant="body1"
              component="p"
              color="text.primary"
              align="center"
            >
              The user you are looking for does not exist.
            </Typography>
          </Stack>
        </Box>
      </Container>

      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row"
        mt={3}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
          startIcon={<HomeIcon />}
        >
          Home Page
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/profile/me")}
          startIcon={<AccountCircleIcon />}
        >
          My Profile
        </Button>
      </Stack>
    </>
  )
}
