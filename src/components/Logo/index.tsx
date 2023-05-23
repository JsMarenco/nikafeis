import React from "react"

// Third-party dependencies
import FacebookIcon from "@mui/icons-material/Facebook"
import { IconButton } from "@mui/material"
import { useRouter } from "next/router"

// Current project dependencies
import appRoutes from "@/constants/app/routes"

export default function Logo() {
  const router = useRouter()

  return (
    <>
      <IconButton onClick={() => router.push(appRoutes.home)}>
        <FacebookIcon fontSize="large" />
      </IconButton>
    </>
  )
}
