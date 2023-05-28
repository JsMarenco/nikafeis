// Third-party dependencies
import { IUser } from "@/ts/interfaces/user"
import { Box, Typography } from "@mui/material"

// Current project dependencies

type ProfileAboutPropsPicked = "description"

interface ProfileAboutProps extends Pick<IUser, ProfileAboutPropsPicked> {}

export default function ProfileAbout({ description }: ProfileAboutProps) {
  return (
    <Box
      id="profile_header-about-user"
      sx={{
        borderRadius: 3,
        width: "100%",
        bgcolor: "background.paper",
        p: 2,
      }}
    >
      <Typography variant="subtitle1" color="text.primary" mb={1}>
        About
      </Typography>

      <Typography variant="body1" color="text.primary" fontWeight={300}>
        {description ? description : "No description yet"}
      </Typography>
    </Box>
  )
}
