import { useState, ChangeEvent } from "react"

// Third-party dependencies
import { Button, InputBase, Stack } from "@mui/material"

// Current project dependencies
import inputStyles from "@/styles/components/inputs"
import { inputs } from "./inputs"
import { IUser } from "@/ts/interfaces/user"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"

export default function UpdateUserAccountInfoForm() {
  const { accountInfo, personalInfo } = useSelector(
    (state: RootState) => state.user
  )
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<Partial<IUser>>({
    [inputs.firstname.name]: personalInfo.firstname
      ? personalInfo.firstname
      : "",
    [inputs.lastname.name]: personalInfo.lastname ? personalInfo.lastname : "",
    [inputs.username.name]: accountInfo.username ? accountInfo.username : "",
    [inputs.description.name]: personalInfo.description
      ? personalInfo.description
      : "",
    [inputs.email.name]: accountInfo.email ? accountInfo.email : "",
    [inputs.password.name]: "",
  })
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setLoading(false)
  }

  return (
    <Stack spacing={2}>
      <InputBase
        id={inputs.firstname.id}
        role={inputs.firstname.role}
        placeholder={inputs.firstname.placeholder}
        name={inputs.firstname.name}
        type={inputs.firstname.type}
        value={userInfo.firstname}
        onChange={handleChange}
        autoComplete={inputs.firstname.autoComplete}
        disabled={loading}
        sx={inputStyles.container}
      />

      <InputBase
        id={inputs.lastname.id}
        role={inputs.lastname.role}
        placeholder={inputs.lastname.placeholder}
        name={inputs.lastname.name}
        type={inputs.lastname.type}
        value={userInfo.lastname}
        onChange={handleChange}
        autoComplete={inputs.firstname.autoComplete}
        disabled={loading}
        sx={inputStyles.container}
      />

      <InputBase
        id={inputs.username.id}
        role={inputs.username.role}
        placeholder={inputs.username.placeholder}
        name={inputs.username.name}
        type={inputs.username.type}
        value={userInfo.username}
        onChange={handleChange}
        autoComplete={inputs.firstname.autoComplete}
        disabled={loading}
        sx={inputStyles.container}
      />

      <InputBase
        id={inputs.description.id}
        role={inputs.description.role}
        placeholder={inputs.description.placeholder}
        name={inputs.description.name}
        type={inputs.description.type}
        value={userInfo.description}
        onChange={handleChange}
        autoComplete={inputs.firstname.autoComplete}
        disabled={loading}
        sx={inputStyles.container}
      />

      <InputBase
        id={inputs.email.id}
        role={inputs.email.role}
        placeholder={inputs.email.placeholder}
        name={inputs.email.name}
        type={inputs.email.type}
        value={userInfo.email}
        onChange={handleChange}
        autoComplete={inputs.firstname.autoComplete}
        disabled={loading}
        sx={inputStyles.container}
      />

      <InputBase
        id={inputs.password.id}
        role={inputs.password.role}
        placeholder={inputs.password.placeholder}
        name={inputs.password.name}
        type={inputs.password.type.hidden}
        value={userInfo.password}
        onChange={handleChange}
        autoComplete={inputs.firstname.autoComplete}
        sx={inputStyles.container}
        disabled={loading}
        endAdornment={
          <Button
            variant="contained"
            color="primary"
            sx={inputStyles.leftIcon}
            disabled={loading || !userInfo.password}
            onClick={handleSubmit}
          >
            Save
          </Button>
        }
      />
    </Stack>
  )
}
