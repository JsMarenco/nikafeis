// Third-party dependencies
import { Box, Typography } from "@mui/material"

// Current project dependencies
import { MenuSectionProps } from "@/ts/interfaces/menu"
import CustomMenuItem from "../MenuSectionItem"

export default function MenuSection({ label, items }: MenuSectionProps) {
  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      <Typography
        variant="body1"
        color="text.primary"
        align="left"
        fontWeight={300}
        mt={1}
      >
        {label}
      </Typography>

      {items.map((item, index) => (
        <CustomMenuItem key={index} {...item} />
      ))}
    </Box>
  )
}
