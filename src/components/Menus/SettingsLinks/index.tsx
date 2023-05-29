// Third-party dependencies
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"

// Current project dependencies
import { MenuSectionItemProps } from "@/ts/interfaces/menu"
import appRoutes from "@/constants/app/routes"

const iconSize = "medium"

export const SettingsLinks: MenuSectionItemProps[] = [
  {
    icon: <TranslateOutlinedIcon fontSize={iconSize} />,
    label: "General",
    link: appRoutes.settings.general,
  },
  {
    icon: <PrivacyTipOutlinedIcon fontSize={iconSize} />,
    label: "Privacy",
    link: appRoutes.settings.privacy,
  },
  {
    icon: <AccountCircleOutlinedIcon fontSize={iconSize} />,
    label: "Account",
    link: appRoutes.settings.account,
  },
]
