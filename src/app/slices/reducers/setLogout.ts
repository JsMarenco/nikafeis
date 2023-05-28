// Third-party dependencies
import { CaseReducer } from "@reduxjs/toolkit"

// Current project dependencies
import { IInitialUserState } from "@/ts/interfaces/states/states"
import initialUserState from "@/utils/states/user"

const setLogoutReducer: CaseReducer<IInitialUserState> = () => {
  return initialUserState
}

export default setLogoutReducer
