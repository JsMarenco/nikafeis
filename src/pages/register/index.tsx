// Third-party dependencies
import { Box, Typography, Stack, Button } from "@mui/material"
import Link from "next/link"

// Current project dependencies
import appRoutes from "@/constants/app/routes"
import bgRegister from "@/assets/images/bg_register.jpg"
import RegisterForm from "@/components/Forms/RegisterForm"
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import appTitles from "@/ts/enums/appTitles"

export default function Register() {
  useChangePageTitle(appTitles.register)

  return (
    <Box
      className="items-stretch h-screen w-screen flex justify-start"
      sx={{
        backgroundImage: `url(${bgRegister.src})`,
      }}
    >
      <Box
        className="flex align-center justify-center"
        sx={{
          bgcolor: "background.default",
          width: {
            xs: "100%",
            sm: "65%",
            md: "50%",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "90%",
              sm: "80%",
              md: "70%",
            },
          }}
        >
          <Typography
            variant="h2"
            color="text.primary"
            align="center"
            fontWeight={400}
          >
            Join now
          </Typography>

          <Stack spacing={2} sx={{ my: 2 }} component={"form"}>
            <RegisterForm />
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2" color="text.primary">
              already have an account?
            </Typography>

            <Button variant="text" color="primary" size="small">
              <Link href={appRoutes.auth.login}>Login</Link>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
