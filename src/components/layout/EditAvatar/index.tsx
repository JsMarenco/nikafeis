import React, { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { EditAvatarStyles } from "./styles"

import { GlobalContext } from "../../../context/GlobalState"

import { getEditAvatarData } from "../../../services/user"

import PreviewAvatar from "./components/PreviewAvatar"
import ForgotPasswordButton from "../ForgotPassworButton"

import { Button, IconButton, Box, Stack, Typography, TextField, } from "@mui/material"

import { PhotoCamera } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"

export default function EditAvatar() {
  const { user, setUser } = useContext(GlobalContext)

  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)

  const clearImage = () => {
    setSelectedFile(undefined)
    setPreview("")
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview("")
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    setLoading(true)
 
    getEditAvatarData(user.id)
      .then(res => {
        setUser({ ...user, avatar: res.data.avatar })

        navigate("/profile/me")
      })
      .catch(err => {
        console.log(err)

        setLoading(false)
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
        Edit avatar
      </Typography>

      <Box
        sx={{ ...EditAvatarStyles, mt: 3 }}
        component="form"
        id="edit-avatar-form"
      >
        <PreviewAvatar src={preview} />

        <Typography
          variant="subtitle1"
          color="text.primary"
          align="center"
          mb={2}
        >
          Select an image
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          justifyContent={"center"}
        >

          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={onSelectFile}
              name="image-input"
              disabled={loading}
            />

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={loading}
            >
              <PhotoCamera />
            </IconButton>
          </label>

          {
            preview && (
              <>
                <Button
                  variant="text"
                  color="primary"
                  onClick={clearImage}
                  sx={{
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  startIcon={<ClearIcon />}
                  disabled={loading}
                >
                  Delete
                </Button>

                <Button
                  variant="text"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Update
                </Button>
              </>
            )
          }
        </Stack>

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
        />

        <ForgotPasswordButton />
      </Box>
    </>
  )
}
