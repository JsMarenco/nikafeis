import React, { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { containerStyles, formConatinerStyles, buttonStyles } from "./styles"

import { changeTitle } from "../../services"
import { getResetPasswordData } from "../../services/user"

import {
  Box, Typography, Paper, TextField, Button, Divider
} from "@mui/material"

export default function ResetPassword() {
  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    getResetPasswordData()
      .then(() => {

        navigate("/login")
      })
      .catch(err => {
        setMessage(err.response.data.error)

        setTimeout(() => {
          setMessage("")
        }, 3500)
      })
  }

  useEffect(() => {
    changeTitle("Reset password")
  }, [])

  return (
    <Box sx={containerStyles}>
      <Paper sx={formConatinerStyles} elevation={4}>
        <Typography variant="body2" color="text.prmary">{message}</Typography>

        <Box>
          <Typography
            variant="h6"
            color="text.primary"
            mb={0.5}
          >
            Enter your new password
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }} component={"form"} id="reset-password-form">
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
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
          Reset password
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
