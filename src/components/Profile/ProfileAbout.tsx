// Third-party dependencies
import { Box, Divider, Typography } from "@mui/material"
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined"
import PersonIcon from "@mui/icons-material/Person"
import GroupIcon from "@mui/icons-material/Group"

// Current project dependencies
import { IUser } from "@/ts/interfaces/user"
import { FC, ReactNode } from "react"
import { convertDate } from "@/utils/basic"
type ProfileAboutPropsPicked = "description" | "posts" | "createdAt" | "friends"

interface ProfileAboutProps extends Pick<IUser, ProfileAboutPropsPicked> {}

export default function ProfileAbout({
  description,
  posts,
  createdAt,
  friends,
}: ProfileAboutProps) {
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

      <Divider sx={{ my: 2 }} />

      <ItemInfo
        icon={<DynamicFeedOutlinedIcon />}
        label={`${posts.length} posts`}
      />
      <ItemInfo
        icon={<PersonIcon />}
        label={`Member since ${convertDate(createdAt as unknown as string)}`}
      />
      <ItemInfo icon={<GroupIcon />} label={`${friends.length} friends`} />
    </Box>
  )
}

interface ItemInfoProps {
  icon: ReactNode
  label: string
}

const ItemInfo: FC<ItemInfoProps> = ({ icon, label }) => {
  return (
    <Box className="flex items-center justify-start gap-2 my-2">
      <Box sx={{ color: "text.primary" }}>{icon}</Box>

      <Typography variant="subtitle2" color="text.primary" fontWeight={300}>
        {label}
      </Typography>
    </Box>
  )
}
