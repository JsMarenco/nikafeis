// Third-party dependencies
import { Box, Typography } from "@mui/material"

// Current project dependencies
import { CustomMenuProps } from "@/ts/interfaces/menu"
import CustomMenuItem from "../CustomMenuItem"

export default function CustomMenu({ label, items }: CustomMenuProps) {
  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      <Typography
        variant="body1"
        color="primary.main"
        align="left"
        fontWeight={300}
      >
        {label}
      </Typography>

      {items.map((item, index) => (
        <CustomMenuItem key={index} {...item} />
      ))}
    </Box>
  )
}
