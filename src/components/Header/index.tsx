import { useContext, useState, MouseEvent } from "react"

// Third-party dependencies
import {
  AppBar,
  Stack,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useDispatch, useSelector } from "react-redux"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"

// Current project dependencies
import Logo from "../Logo"
import { AppThemeContext } from "@/context/AppThemeContext"
import { appThemes } from "@/themes"
import { RootState } from "@/app/store"
import { setLogout } from "@/app/slices/user"
import { useRouter } from "next/router"
import appRoutes from "@/constants/app/routes"
import Link from "next/link"

export default function Header() {
  const { handleChangeThemeApp, currentThemeName } = useContext(AppThemeContext)
  const { personalInfo, accountInfo } = useSelector(
    (state: RootState) => state.user
  )
  const dispatch = useDispatch()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isAvatarMenuOpen = Boolean(anchorEl)
  // eslint-disable-next-line no-undef

  const handleClickAvatarMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseAvatarMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(setLogout())
    router.push(appRoutes.auth.login)
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

          <IconButton onClick={handleClickAvatarMenu}>
            <Avatar
              src={personalInfo.avatarUrl}
              alt={`${personalInfo.firstname} ${personalInfo.lastname}'s avatar`}
            >
              {personalInfo.firstname.charAt(0).toLocaleUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isAvatarMenuOpen}
            onClose={handleCloseAvatarMenu}
            onClick={handleCloseAvatarMenu}
            PaperProps={{
              elevation: 0,
              sx: {
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
                  // eslint-disable-next-line quotes
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link href={appRoutes.profile.view(accountInfo.username)}>
              <MenuItem>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
            </Link>

            <Divider sx={{ my: 1.5 }} />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
