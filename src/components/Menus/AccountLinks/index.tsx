// Third-party dependencies
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"

// Current project dependencies
import { MenuSectionItemProps } from "@/ts/interfaces/menu"
import appRoutes from "@/constants/app/routes"

const iconSize = "medium"

export const AccountLinks: MenuSectionItemProps[] = [
  {
    icon: <PersonOutlinedIcon fontSize={iconSize} />,
    label: "Profile",
    link: appRoutes.pages.groups,
  },
  {
    icon: <PeopleOutlinedIcon fontSize={iconSize} />,
    label: "Friends",
    link: appRoutes.pages.friends,
  },
  {
    icon: <GroupsOutlinedIcon fontSize={iconSize} />,
    label: "Groups",
    link: appRoutes.pages.groups,
  },
]
