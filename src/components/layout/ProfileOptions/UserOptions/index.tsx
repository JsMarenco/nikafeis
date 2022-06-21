import React from "react"

import { useNavigate } from "react-router-dom"

import {
  Button
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"

export default function UserOptions() {
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
        onClick={() => navigate("/account")}
      >
        Edit profile
      </Button>
    </>

  )
}
