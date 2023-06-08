// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import { Typography, Box, IconButton } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// Current project dependencies
import Layout from "@/components/Layout"
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import cardStyles from "@/styles/components/card"
import profileSettingsPng from "@/assets/images/bg_profile_settings.png"
import appRoutes from "@/constants/app/routes"
import privacySettingsSectionPng from "@/assets/images/bg_privacy_settings.png"
import appearanceSttingsPng from "@/assets/images/bg_appearence_settings.png"

export default function GeneralSettingsSection() {
  useChangePageTitle("General Settings")

  return (
    <Layout>
      <Grid
        container
        disableEqualOverflow
        spacing={2}
        columnSpacing={4}
        sx={{ px: 2 }}
      >
        <Grid xs={12} sm={6} md={4}>
          <SettingItem
            src={profileSettingsPng.src}
            width={profileSettingsPng.width}
            height={profileSettingsPng.height}
            label="Account settings"
            link={appRoutes.settings.account}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <SettingItem
            src={privacySettingsSectionPng.src}
            width={privacySettingsSectionPng.width}
            height={privacySettingsSectionPng.height}
            label="Privacy settings"
            link={appRoutes.settings.privacy}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <SettingItem
            src={appearanceSttingsPng.src}
            width={appearanceSttingsPng.width}
            height={appearanceSttingsPng.height}
            label="Appearance settings"
            link={appRoutes.settings.account}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

interface SettingItemProps {
  link: string
  src: string
  label: string
  width: number
  height: number
}

const SettingItem = ({ link, label, src, width, height }: SettingItemProps) => {
  return (
    <Box sx={{ ...cardStyles.container, boxShadow: 3, position: "relative" }}>
      <Box
        sx={{
          width: "60%",
          height: "150px",
          flexShrink: 0,
          mx: "auto",
        }}
      >
        <Image
          src={src}
          alt="Profile settings"
          width={width}
          height={height}
          className="mx-auto"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <Typography
        variant="h6"
        color="text.primary"
        fontWeight={400}
        align="center"
        mt={2}
      >
        {label}
      </Typography>

      <Box
        sx={{
          position: "absolute",
          top: "40%",
          right: "-20px",
          borderRadius: "100%",
          bgcolor: "background.paper",
          boxShadow: 5,
        }}
      >
        <Link href={link}>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  )
}
