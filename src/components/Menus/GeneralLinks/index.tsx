// Third-party dependencies
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined"

// Current project dependencies
import { MenuSectionItemProps } from "@/ts/interfaces/menu"
import appRoutes from "@/constants/app/routes"

const iconSize = "medium"

export const GeneralLinks: MenuSectionItemProps[] = [
  {
    icon: <HomeOutlinedIcon fontSize={iconSize} />,
    label: "Home",
    link: appRoutes.pages.home,
  },
  {
    icon: <TravelExploreOutlinedIcon fontSize={iconSize} />,
    label: "Explore",
    link: appRoutes.pages.explore,
  },
  {
    icon: <NotificationsNoneOutlinedIcon fontSize={iconSize} />,
    label: "Notifications",
    link: appRoutes.pages.explore,
  },
  {
    icon: <ForumOutlinedIcon fontSize={iconSize} />,
    label: "Messages",
    link: appRoutes.pages.inbox,
  },
]
