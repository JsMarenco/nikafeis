// Third-party dependencies
import { AppBar, Stack, Toolbar, IconButton } from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

// Current project dependencies
import Logo from "../Logo"
import { useContext } from "react"
import { AppThemeContext } from "@/context/AppThemeContext"
import { appThemes } from "@/themes"

export default function Header() {
  const { handleChangeThemeApp, currentThemeName } = useContext(AppThemeContext)

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar
        sx={{
          maxWidth: "xl",
          mx: "auto",
          width: "100%",
        }}
        className="flex items-center justify-between"
      >
        <Stack>
          <Logo />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          spacing={0.5}
        >
          <IconButton
            aria-label={`${currentThemeName} button`}
            onClick={handleChangeThemeApp}
          >
            {currentThemeName === appThemes.dark ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
