import React, { useContext, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../context/GlobalState"

import { containerStyles, formConatinerStyles, buttonStyles } from "./styles"

import { changeTitle } from "../../services"
import { getRegisterData } from "../../services/user"

import {
  Box, Typography, Paper, TextField, Button, Divider, Stack
} from "@mui/material"

export default function Register() {
  const { user } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [message, setMessage] = React.useState("")

  const handleSubmit = async () => {
    getRegisterData()
      .then(() => {
        navigate("/login")
      })
      .catch((err) => {
        setMessage(err.response.data.error)

        setTimeout(() => {
          setMessage("")
        }, 3500)
      })
  }

  useEffect(() => {
    changeTitle("Register")

    const token = user.token

    if (token) {
      navigate("/")
    }
  }, [])

  return (
    <Box sx={containerStyles}>
      <Paper sx={formConatinerStyles} elevation={4}>
        <Typography variant="body2" color="text.prmary">{message}</Typography>

        <Box>
          <Typography
            variant="h6"
            color="text.primary"
          >
            Register
          </Typography>
        </Box>

        <Box sx={{ width: "100%", mt: 2 }} component={"form"} id="register-form">
          <Stack spacing={2} direction="row" >
            <TextField
              name="name-input"
              label="Name"
              variant="outlined"
              fullWidth
              placeholder="John"
              autoComplete="off"
              required
            />

            <TextField
              name="lastname-input"
              label="Last name"
              variant="outlined"
              fullWidth
              placeholder="Doe"
              autoComplete="off"
              required
            />
          </Stack>

          <TextField
            name="email-input"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="myemail@gmail.com"
            autoComplete="off"
            required
          />

          <TextField
            name="password-input"
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="********"
            autoComplete="off"
            required
          />

          <TextField
            name="passwordConfirmation-input"
            label="Repeat Password"
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="********"
            autoComplete="off"
            required
          />
        </Box>

        <Divider flexItem sx={{ m: 1, mb: 2 }} />

        <Button
          variant="contained"
          fullWidth
          sx={buttonStyles}
          onClick={handleSubmit}
        >
          Register
        </Button>

        <Typography
          variant="body2"
          color="text.primary"
          sx={{ mt: 2 }}
        >
          already have an account?

          <Button
            variant="text"
            color="primary"
            sx={{ ml: 1 }}
            href="/login"
          >
            Login
          </Button>
        </Typography>
      </Paper >
    </Box >
  )
}
