import React, { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../context/GlobalState"

import { containerStyles, formConatinerStyles, buttonStyles } from "./styles"

import { changeTitle } from "../../services"
import { getLoginData } from "../../services/user"

import ForgotPasswordButton from "../../components/layout/ForgotPassworButton"

import {
  Box, Typography, Paper, TextField, Button, Divider
} from "@mui/material"

export default function Login() {
  const { setUser, user } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    getLoginData()
      .then((res) => {
        // update the user in the global stat
        setUser(res.data.user)
        
        if (user) {
          navigate("/")
        } else {
          setMessage("Something went wrong")
        }
      })
      .catch(err => {
        console.log(err)
        setMessage(err.response.data.error)

        setTimeout(() => {
          setMessage("")
        }, 3500)
      })
  }

  useEffect(() => {
    changeTitle("Login")

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
            Login
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }} component={"form"} id="login-form">
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
        </Box>

        <Divider flexItem sx={{ m: 1, mb: 2 }} />

        <Button
          variant="contained"
          fullWidth
          sx={buttonStyles}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <ForgotPasswordButton />

        <Typography
          variant="body2"
          color="text.primary"
          sx={{ mt: 2 }}
        >
          Don{"'"}t have an account yet?

          <Button
            variant="text"
            color="primary"
            sx={{ ml: 1 }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Typography>
      </Paper >
    </Box >
  )
}
