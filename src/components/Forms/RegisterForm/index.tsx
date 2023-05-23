import { useContext, useState, ChangeEvent } from "react"

// Third-party dependenciesl
import { Button, Icon, Stack, TextField } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"

// Current project dependenciesl
import { AppMessageContext } from "@/context/AppMessageContext"
import httpStatus from "@/constants/common/httpStatus"
import { IRegisterUser } from "@/ts/interfaces/user"
import registerService from "@/services/user/registerService"
import { registerFormInputs } from "./inputs"

export default function RegisterForm() {
  const [registerInfo, setRegisterInfo] = useState<IRegisterUser>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(AppMessageContext)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { message, status } = await registerService(registerInfo)

    // TODO: Add the distpach here to save the user info

    if (status === httpStatus.created.code) {
      handleMessage(message)
    }

    if (status === httpStatus.badRequest.code) {
      handleMessage(message)
    }

    setLoading(false)
  }

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          disabled={loading}
          id={registerFormInputs.firstname.id}
          role={registerFormInputs.firstname.role}
          name={registerFormInputs.firstname.name}
          type={registerFormInputs.firstname.type}
          value={registerInfo.firstname}
          onChange={(e) => handleChange(e)}
          autoComplete={registerFormInputs.firstname.autoComplete}
          placeholder={registerFormInputs.firstname.placeholder}
          size={"medium"}
          fullWidth
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
          id={registerFormInputs.lastname.id}
          role={registerFormInputs.lastname.role}
          name={registerFormInputs.lastname.name}
          type={registerFormInputs.lastname.type}
          value={registerInfo.lastname}
          onChange={(e) => handleChange(e)}
          autoComplete={registerFormInputs.lastname.autoComplete}
          placeholder={registerFormInputs.lastname.placeholder}
          size={"medium"}
          fullWidth
          InputProps={{
            startAdornment: (
              <Icon sx={{ mr: 2 }}>
                <EmailOutlinedIcon />
              </Icon>
            ),
          }}
        />
      </Stack>

      <TextField
        disabled={loading}
        id={registerFormInputs.email.id}
        role={registerFormInputs.email.role}
        name={registerFormInputs.email.name}
        type={registerFormInputs.email.type}
        value={registerInfo.email}
        onChange={(e) => handleChange(e)}
        autoComplete={registerFormInputs.email.autoComplete}
        placeholder={registerFormInputs.email.placeholder}
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
        id={registerFormInputs.password.id}
        role={registerFormInputs.password.role}
        name={registerFormInputs.password.name}
        type={
          showPassword
            ? registerFormInputs.password.type.show
            : registerFormInputs.password.type.hidden
        }
        value={registerInfo.password}
        onChange={(e) => handleChange(e)}
        autoComplete={registerFormInputs.password.autoComplete}
        placeholder={registerFormInputs.password.placeholder}
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

      <TextField
        disabled={loading}
        id={registerFormInputs.confirmPassword.id}
        role={registerFormInputs.confirmPassword.role}
        name={registerFormInputs.confirmPassword.name}
        type={
          showPassword
            ? registerFormInputs.confirmPassword.type.show
            : registerFormInputs.confirmPassword.type.hidden
        }
        value={registerInfo.confirmPassword}
        onChange={(e) => handleChange(e)}
        autoComplete={registerFormInputs.confirmPassword.autoComplete}
        placeholder={registerFormInputs.confirmPassword.placeholder}
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
