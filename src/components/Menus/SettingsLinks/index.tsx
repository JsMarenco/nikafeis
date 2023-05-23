// Third-party dependencies
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"

// Current project dependencies
import { CustomMenuItemProps } from "@/ts/interfaces/menu"
import appRoutes from "@/constants/app/routes"

const iconSize = "medium"

export const SettingsLinks: CustomMenuItemProps[] = [
  {
    icon: <ManageAccountsOutlinedIcon fontSize={iconSize} />,
    label: "Profile",
    link: appRoutes.settings.profile,
  },
  {
    icon: <AdminPanelSettingsOutlinedIcon fontSize={iconSize} />,
    label: "Account",
    link: appRoutes.settings.account,
  },
]
