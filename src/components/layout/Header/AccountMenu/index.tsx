import React, { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../../../context/GlobalState"

import {
  Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip,
} from "@mui/material"

import {
  Logout,
} from "@mui/icons-material"

export default function AccountMenu() {
  const { user } = useContext(GlobalContext)
  
  const navigate = useNavigate()

  const [userImage, setUserImage] = useState("")
  const [userFullName, setUserFullName] = useState("")

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (user) {
      setUserImage(user.avatar)
      setUserFullName(`${user.name} ${user.lastName}`)
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={userImage}
              sx={{ width: 42, height: 42 }}
              alt={userFullName}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: "rgba(32,32,32, 0.9)",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: "\"\"",
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile/me")}>
          <Avatar /> Profile
        </MenuItem>

        <MenuItem onClick={() => navigate("/account")}>
          <Avatar /> Account
        </MenuItem>

        <MenuItem onClick={() => navigate("/logout")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
