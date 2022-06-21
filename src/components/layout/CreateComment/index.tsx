import React, { useEffect, useState, useContext } from "react"

import { GlobalContext } from "../../../context/GlobalState"

import { getCommentData } from "../../../services/comments"

import CreateCommentInterface from "../interfaces/createComment"

import {
  Avatar, TextField, Stack, IconButton, Box, Button,
} from "@mui/material"

import SendIcon from "@mui/icons-material/Send"
import PhotoCamera from "@mui/icons-material/PhotoCamera"

export default function CreateComment(props: CreateCommentInterface) {
  const {
    post_id = "",
  } = props

  const { user } = useContext(GlobalContext)

  const [loading, setLoading] = useState(false)

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState("")

  const [userFullName, setUserFullName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")

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

  useEffect(() => {
    if (user) {
      const { name, avatar, lastName } = user

      setUserFullName(`${name} ${lastName}`)
      setUserAvatar(avatar)
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const onSubmit = () => {
    setLoading(true)

    getCommentData(user, post_id)
      .then(() => {
        setLoading(false)
      })
      .catch((err: unknown) => {
        console.log(err)
      })
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "0 auto",
      }}
      component="form"
      id="create-comment-form"
    >
      {
        preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              style={{
                height: "auto",
                maxWidth: "250px",
                margin: "0 auto",
              }}
            />

            <Button
              variant="text"
              color="primary"
              sx={{
                display: "block",
                margin: "0 auto",
                width: "150px",
                height: "auto",
                mt: 2,
              }}
              onClick={() => setSelectedFile(undefined)}
              disabled={loading}
            >
              Delete
            </Button>
          </>
        ) : (
          <></>
        )
      }

      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        sx={{
          width: "100%",
          mt: 2,
        }}
      >
        <Avatar
          sizes="small"
          src={userAvatar}
          alt={userFullName}
          sx={{
            mr: 1,
          }}
        />

        <TextField
          name="body-input"
          label="Add a comment"
          variant="standard"
          autoCapitalize="false"
          autoComplete="off"
          fullWidth
          sx={{
            display: "flex",
            borderRadius: "15px",
          }}
          disabled={loading}
        />

        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={onSelectFile}
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

        <IconButton
          aria-label="Comment"
          disabled={loading}
          sx={{ ml: 2 }}
          onClick={onSubmit}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}
