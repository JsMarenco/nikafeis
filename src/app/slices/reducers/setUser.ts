// Third-party dependencies
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

// Current project dependencies
import { IInitialUserState } from "@/ts/interfaces/states/states"
import { IUser } from "@/ts/interfaces/user"

const setUserReducer: CaseReducer<IInitialUserState, PayloadAction<IUser>> = (
  state,
  action
) => {
  const { ...userProps } = action.payload

  state.auth = { ...userProps, isLogged: true }
  state.personalInfo = { ...userProps }
  state.accountInfo = { ...userProps }
  state.socialMediaLinks = { ...userProps }
  state.profileInfo = { ...userProps }
  state.timestamps = { ...userProps }
  state.relationships = { ...userProps }
}

export default setUserReducer
