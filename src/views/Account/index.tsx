import React, { useEffect } from "react"

import { changeTitle } from "../../services"

import Header from "../../components/layout/Header"
import DeleteAccount from "../../components/layout/DeleteAccount"
import EditAccount from "../../components/layout/EditAccount"
import EditAvatar from "../../components/layout/EditAvatar"

import {
  Divider
} from "@mui/material"

export default function Account() {

  useEffect(() => {
    changeTitle("Account")
  }, [])

  return (
    <>
      <Header />

      <EditAvatar />

      <Divider sx={{ m: 3 }} />

      <EditAccount />

      <Divider sx={{ m: 3 }} />

      <DeleteAccount />

      <Divider sx={{ m: 3 }} />
    </>
  )
}
