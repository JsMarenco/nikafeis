// Third-party dependencies
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

// Current project dependencies
import { MenuSectionItemProps } from "@/ts/interfaces/menu"
import appRoutes from "@/constants/app/routes"

const iconSize = "medium"

export const MoreLinks: MenuSectionItemProps[] = [
  {
    icon: <LogoutOutlinedIcon fontSize={iconSize} />,
    label: "Logout",
    link: appRoutes.auth.logout,
  },
]
