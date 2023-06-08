// Third-party dependencies
import Grid from "@mui/material/Unstable_Grid2"
import CollectionsIcon from "@mui/icons-material/Collections"

// Current project dependencies
import Layout from "@/components/Layout"
import { Box, IconButton, Stack } from "@mui/material"
import SettingSection from "../SettingSection"
import UpdateUserAccountInfoForm from "@/components/Forms/UpdateUserInfoForm"

export default function AccountSettingsSection() {
  return (
    <>
      <Layout>
        <Grid container disableEqualOverflow spacing={2}>
          <Grid xs={12} sm={6}>
            <SettingSection label="Personal information">
              <UpdateUserAccountInfoForm />
            </SettingSection>
          </Grid>

          <Grid xs={12} sm={6}>
            <Stack spacing={2}>
              <SettingSection label="Update cover">
                <Box className="flex items-center justify-center h-14">
                  <IconButton>
                    <CollectionsIcon />
                  </IconButton>
                </Box>
              </SettingSection>

              <SettingSection label="Update avatar">
                <Box className="flex items-center justify-center h-14">
                  <IconButton>
                    <CollectionsIcon />
                  </IconButton>
                </Box>
              </SettingSection>
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}
