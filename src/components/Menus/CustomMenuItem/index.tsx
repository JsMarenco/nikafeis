// Third-party dependencies
import { ListItemIcon, MenuItem, Stack, Typography } from "@mui/material"
import Link from "next/link"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { CustomMenuItemProps } from "@/ts/interfaces/menu"

// Current project dependencies

export default function CustomMenuItem({
  icon,
  label,
  link,
}: CustomMenuItemProps) {
  return (
    <Link href={link}>
      <MenuItem
        className="flex items-center justify-between mx-auto"
        sx={{
          bgcolor: "primary.light",
          borderRadius: 3,
          my: 1.5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          spacing={1}
        >
          <ListItemIcon>{icon}</ListItemIcon>

          <Typography variant="body1" color="text.primary" fontWeight={400}>
            {label}
          </Typography>
        </Stack>

        <ArrowForwardIosIcon fontSize="small" />
      </MenuItem>
    </Link>
  )
}
