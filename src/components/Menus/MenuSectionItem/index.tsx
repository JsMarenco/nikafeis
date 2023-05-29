// Third-party dependencies
import { ListItemIcon, MenuItem, Stack, Typography } from "@mui/material"
import Link from "next/link"

// Current project dependencies
import { MenuSectionItemProps } from "@/ts/interfaces/menu"

export default function MenuSectionItem({
  icon,
  label,
  link,
}: MenuSectionItemProps) {
  return (
    <Link href={link}>
      <MenuItem
        className="flex items-center justify-between mx-auto"
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          my: 1.5,
          p: 2,
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
      </MenuItem>
    </Link>
  )
}
