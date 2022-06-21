import React from "react"

import { useNavigate } from "react-router-dom"

import { toolbarStyles } from "./styles"

import SearchBar from "../SearchBar"
import AccountMenu from "./AccountMenu"

import {
  AppBar, Toolbar, Button, Box, IconButton, Stack,
} from "@mui/material"

import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"

export default function Header() {
  const navigate = useNavigate()

  return (
    <AppBar position="relative" color="primary">
      <Toolbar sx={toolbarStyles}>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            "@media screen and (max-width: 600px)": {
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
            }
          }}
        > 
          <Button
            onClick={() => navigate("/")}
            variant="text"
            color="primary"
            size="large"
          >
            Nikafeis
          </Button>

          <SearchBar />
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <IconButton
            aria-label="Friends"
            sx={{ m: 0.5, p: 1 }}
            onClick={() => navigate("/friends")}
          >
            <PeopleAltIcon />
          </IconButton>

          <IconButton
            aria-label="Videos"
            sx={{ m: 0.5, p: 1 }}
            onClick={() => navigate("/videos")}
          >
            <VideoLibraryIcon />
          </IconButton>
        </Box>

        <Box>
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
