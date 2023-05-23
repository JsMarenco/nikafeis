// Third-party dependencies
import { Box, Button, Stack, Typography } from "@mui/material"
import Link from "next/link"

// Current project dependencies
import useChangePageTitle from "@/hooks/general/useChangePageTitle"
import appTitles from "@/ts/enums/appTitles"
import bgLogin from "@/assets/images/bg_login.png"
import LoginForm from "@/components/Forms/LoginForm"
import appRoutes from "@/constants/app/routes"

export default function Login() {
  useChangePageTitle(appTitles.login)

  return (
    <>
      <Box
        className="items-stretch h-screen w-screen flex justify-end"
        sx={{
          backgroundImage: `url(${bgLogin.src})`,
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
              Welcome back
            </Typography>

            <Stack spacing={2} sx={{ my: 2 }} component={"form"}>
              <LoginForm />
            </Stack>

            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2" color="text.primary">
                {"Don't have account yet?"}
              </Typography>

              <Button variant="text" color="primary" size="small">
                <Link href={appRoutes.auth.register}>Join now</Link>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}
