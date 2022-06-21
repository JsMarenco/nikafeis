import React from "react"

import { Button } from "@mui/material"

import PersonAddIcon from "@mui/icons-material/PersonAdd"
import ChatIcon from "@mui/icons-material/Chat"
import AddIcon from "@mui/icons-material/Add"

export default function VisitorOption() {
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonAddIcon />}
      >
        Add friend
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<ChatIcon />}
      >
        Message
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
      >
        Follow
      </Button>
    </>
  )
}
