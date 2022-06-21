import React, { useEffect, useState, useContext } from "react"

import { createPostContainerStyles, createPostFormStyles } from "./styles"

import { getNewPostData } from "../../../services/post"

import { GlobalContext } from "../../../context/GlobalState"

import PriviewImage from "./components/PriviewImage"

import {
  Typography, Box, Divider, TextField, Stack, Button, IconButton
} from "@mui/material"

import { PhotoCamera } from "@mui/icons-material"

export default function CreatePost() {
  const { user } = useContext(GlobalContext)

  const [name, setName] = useState("")

  const [message, setMessage] = useState("")

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

    getNewPostData(user)
      .then(() => {

        window.location.reload()

      })
      .catch(err => {
        setMessage(err.response.data.error)

        setTimeout(() => {
          setMessage("")
        }, 3500)
      })

    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [])

  return (
    <Box sx={createPostContainerStyles} component={"form"} id="create-post-form">
      <Typography
        variant="body2"
        color="text.primary"
        align="center"
      >
        {message}
      </Typography>

      <Typography
        variant="body1"
        color="text.primary"
        mb={2}
      >
        Create Post
      </Typography>

      <Box sx={createPostFormStyles}>
        <Stack spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            name="title-input"
            placeholder="The title of your post"
            fullWidth
            autoComplete="off"
            disabled={loading}
          />

          <TextField
            name="body-input"
            placeholder={`What's on your mind, ${name}?`}
            fullWidth
            autoComplete="off"
            multiline
            rows={4}
            disabled={loading}
          />

          <PriviewImage
            src={preview}
            clearImage={clearImage}
          />
        </Stack>
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Stack
        spacing={2}
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Stack
          spacing={2}
          direction="row"
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
        </Stack>

        <Button
          variant="outlined"
          color="secondary"
          sx={{
            borderRadius: "50px",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          Post
        </Button>
      </Stack>
    </Box>
  )
}
