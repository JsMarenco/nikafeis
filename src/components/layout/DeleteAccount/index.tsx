import React, { useContext } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../../context/GlobalState"

import { deleteAccount } from "../../../services/user"

import ForgotPasswordButton from "../ForgotPassworButton"

import { formStyles } from "./styles"

import {
  Box, Typography, Button, TextField
} from "@mui/material"

export default function DeleteAccount() {
  const { logout, user } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [message, setMessage] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = async () => {
    deleteAccount(user.id)
      .then(() => {
        logout()

        navigate("/login")
      })
      .catch(err => {
        setMessage(err.response.data.error)

        setTimeout(() => {
          setMessage("")
        }, 3500)
      })
  }

  return (
    <>
      <Typography
        variant="h6"
        color="text.primary"
        sx={{ mb: 2 }}
        align="center"
      >
        Delete Account
      </Typography>

      <Box sx={formStyles}
        component={"form"}
        id="delete-account-form"
      >
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="off"
          type={"password"}
          sx={{ mt: 2, mb: 2 }}
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />

        <ForgotPasswordButton />

        <Typography
          variant="body2"
          color="text.primary"
          align="center"
          mt={2}
          mb={2}
        >
          {message}
        </Typography>

        <Button
          variant="contained"
          color="error"
          sx={{
            mb: 2,
            width: "50%",
            mx: "auto",
            display: "block",
            borderRadius: "15px",
          }}
          onClick={handleSubmit}
          disabled={!password}
        >
          Delete Account
        </Button>

        <Typography
          variant="subtitle1"
          color="text.primary"
          sx={{ mb: 2, fontSize: "0.9rem" }}
          align="center"

        >
          This will delete your account and all of your data,
          including your posts, comments, and likes.
        </Typography>
      </Box>
    </>
  )
}
