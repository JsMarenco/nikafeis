// Third-party dependencies
import { createSlice } from "@reduxjs/toolkit"

// Current project dependencies
import initialUserState from "@/utils/states/user"
import { IInitialUserState } from "@/ts/interfaces/states/states"
import setUserReducer from "./reducers/setUser"

const initialUser: IInitialUserState = initialUserState

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: setUserReducer,
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
