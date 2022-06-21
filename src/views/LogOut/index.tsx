import React, { useContext, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../context/GlobalState"

import { containerStyles, formConatinerStyles, buttonStyles } from "./styles"

import { changeTitle } from "../../services"

import {
  Box, Typography, Paper, Button,
} from "@mui/material"

export default function LogOut() {
  const { logout } = useContext(GlobalContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    logout()

    navigate("/login")
  }

  useEffect(() => {
    changeTitle("Log out")
  }, [])

  return (
    <Box sx={containerStyles}>
      <Paper sx={formConatinerStyles} elevation={4}>

        <Box>
          <Typography
            variant="h6"
            color="text.primary"
          >
            Do you want to log out?
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={buttonStyles}
          onClick={handleLogOut}
        >
          Log out
        </Button>

        <Button
          variant="text"
          fullWidth
          onClick={() => navigate(-1)}
          sx={{ mt: 1, width: "85%", borderRadius: "15px" }}
        >
          Back
        </Button>
      </Paper >
    </Box >
  )
}
