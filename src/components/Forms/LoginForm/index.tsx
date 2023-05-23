import { useState, ChangeEvent, useContext } from "react"

// Third-party dependenciesl
import {
  Button,
  Divider,
  Icon,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"

// Current project dependenciesl
import { loginFormInputs } from "./inputs"
import { ILoginUser } from "@/ts/interfaces/user"
import loginService from "@/services/user/loginService"
import { AppMessageContext } from "@/context/AppMessageContext"
import httpStatus from "@/constants/common/httpStatus"
import appRoutes from "@/constants/app/routes"
import { setUser } from "@/app/slices/user"

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState<ILoginUser>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(AppMessageContext)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { body, message, status } = await loginService(loginInfo)

    if (status === httpStatus.ok.code) {
      dispatch(setUser({ ...body.user, accessToken: body.accessToken }))
      handleMessage(message)
      router.push(appRoutes.home)
    }

    if (status === httpStatus.badRequest.code) {
      handleMessage(message)
    }

    setLoading(false)
  }

  return (
    <>
      <TextField
        disabled={loading}
        id={loginFormInputs.email.id}
        role={loginFormInputs.email.role}
        name={loginFormInputs.email.name}
        type={loginFormInputs.email.type}
        value={loginInfo.email}
        onChange={(e) => handleChange(e)}
        autoComplete={loginFormInputs.email.autoComplete}
        placeholder={loginFormInputs.email.placeholder}
        size={"medium"}
        InputProps={{
          startAdornment: (
            <Icon sx={{ mr: 2 }}>
              <EmailOutlinedIcon />
            </Icon>
          ),
        }}
      />

      <TextField
        disabled={loading}
        id={loginFormInputs.password.id}
        role={loginFormInputs.password.role}
        name={loginFormInputs.password.name}
        type={
          showPassword
            ? loginFormInputs.password.type.show
            : loginFormInputs.password.type.hidden
        }
        value={loginInfo.password}
        onChange={(e) => handleChange(e)}
        autoComplete={loginFormInputs.password.autoComplete}
        placeholder={loginFormInputs.password.placeholder}
        size={"medium"}
        InputProps={{
          startAdornment: (
            <Icon
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
            </Icon>
          ),
        }}
      />

      <Divider flexItem />

      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body2" color="text.primary">
          Forgot passwrod?
        </Typography>

        <Button variant="text" color="primary">
          <Link href={appRoutes.auth.forgotPassword}>Reset password</Link>
        </Button>
      </Stack>

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        Login
      </Button>
    </>
  )
}
