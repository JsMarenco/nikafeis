import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { containerStyles, formConatinerStyles, buttonStyles } from "./styles"

import { changeTitle } from "../../services"
import { getForgotPasswordData } from "../../services/user"

import {
  Box, Typography, Paper, TextField, Button, Divider
} from "@mui/material"

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [message, setMessage] = React.useState("")

  const handleSubmit = async () => {
    const status = new Promise((resolve, reject) => {
      getForgotPasswordData()
        .then((res) => {
          navigate(`/reset-password?token=${res.data.token}&userid=${res.data.userId}`)
        })
        .catch(err => {
          setMessage(err.response.data.error)
          setTimeout(() => {
            setMessage("")
          }, 3500)
          reject(err)
        })
    })

    status
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    changeTitle("Forgot password")
  }, [])

  return (
    <Box sx={containerStyles}>
      <Paper sx={formConatinerStyles} elevation={4}>
        <Typography variant="body2" color="text.prmary">{message}</Typography>

        <Box>
          <Typography
            variant="h6"
            color="text.primary"
            mb={1}
            align="center"
          >
            Enter your email
          </Typography>

          <Typography
            variant="body2"
            color="text.primary"
            mb={0.5}
          >
            if you can{"'"}t see the email, please check your spam folder
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }} component={"form"} id="forgot-password-form">
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
        </Box>

        <Divider flexItem sx={{ m: 1, mb: 2 }} />

        <Button
          variant="contained"
          fullWidth
          sx={buttonStyles}
          onClick={handleSubmit}
        >
          Send me the code
        </Button>

        <Button
          variant="text"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mt: 1, width: "85%" }}
        >
          Back
        </Button>
      </Paper >
    </Box >
  )
}
