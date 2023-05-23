// Third-party dependencies
import { AppBar, Stack, Toolbar } from "@mui/material"

// Current project dependencies
import Logo from "../Logo"

export default function Header() {
  return (
    <AppBar position="fixed" color="primary">
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
      </Toolbar>
    </AppBar>
  )
}
