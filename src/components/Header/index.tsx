import { useContext, useState, MouseEvent } from "react"

// Third-party dependencies
import {
  AppBar,
  Stack,
  Toolbar,
  IconButton,
  SwipeableDrawer,
} from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"

// Current project dependencies
import Logo from "../Logo"
import { AppThemeContext } from "@/context/AppThemeContext"
import { appThemes } from "@/themes"
import MenuSection from "../Menus/MenuSection"
import { SettingsLinks } from "../Menus/SettingsLinks"
import { AccountLinks } from "../Menus/AccountLinks"
import { GeneralLinks } from "../Menus/GeneralLinks"
import { MoreLinks } from "../Menus/MoreLinks"

export default function Header() {
  const { handleChangeThemeApp, currentThemeName } = useContext(AppThemeContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

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

          <IconButton onClick={handleClickMenu}>
            <MenuOutlinedIcon />
          </IconButton>

          <SwipeableDrawer
            anchor={"right"}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            onOpen={handleClickMenu}
            sx={{
              ".MuiDrawer-paper": {
                backgroundImage: "none",
                width: "250px",
                bgcolor: "background.default",
              },
            }}
          >
            <MenuSection items={GeneralLinks} label={"General"} />
            <MenuSection items={AccountLinks} label={"Account"} />
            <MenuSection items={SettingsLinks} label={"Settings"} />
            <MenuSection items={MoreLinks} label={"More"} />
          </SwipeableDrawer>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
