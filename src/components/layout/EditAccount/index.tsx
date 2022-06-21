import React, { useEffect, useState, useContext } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../../context/GlobalState"

import { formStyles } from "./styles"

import { getEditAccountData } from "../../../services/user"

import ForgotPasswordButton from "../ForgotPassworButton"

import {
  Typography, TextField, Box, Stack, Button
} from "@mui/material"

export default function EditAccount() {
  const { user, setUser } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [username, setUsername] = useState("")
  const [website, setWebsite] = useState("")

  const [password, setPassword] = useState("")

  useEffect(() => {
    setName(user.name)
    setLastName(user.lastName)
    setEmail(user.email)
    setDescription(user.description)
    setUsername(user.username)
    setWebsite(user.website)
  }, [])

  const handleSubmit = async () => {
    getEditAccountData(user.id)
      .then((res) => {
        setUser(res.data)

        navigate("/profile/me")
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
        variant="h5"
        color="text.primary"
        align="center"
        mt={3}
      >
        Edit account
      </Typography>

      <Box
        component="form"
        id="edit-account-form"
        sx={{ ...formStyles, mt: 3 }}
      >
        <Stack direction={"row"} spacing={2}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            autoComplete="off"
            placeholder={name}
          />

          <TextField
            name="lastName"
            label="Last name"
            variant="outlined"
            fullWidth
            autoComplete="off"
            placeholder={lastName}
          />

        </Stack>

        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          autoComplete="off"
          sx={{ mt: 3 }}
          placeholder={username}
        />

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          autoComplete="off"
          type={"email"}
          sx={{ mt: 2 }}
          placeholder={email}
        />

        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          autoComplete="off"
          sx={{ mt: 2 }}
          placeholder={description ? description : "I am a new user"}
        />

        <TextField
          name="website"
          label="Website"
          variant="outlined"
          fullWidth
          autoComplete="off"
          sx={{ mt: 2 }}
          placeholder={website ? website : "https://www.example.com"}
        />

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
        >
          {message}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            width: "50%",
            mx: "auto",
            display: "block",
            borderRadius: "15px",
          }}
          onClick={handleSubmit}
          disabled={!password}
        >
          Save changes
        </Button>
      </Box>
    </>
  )
}
