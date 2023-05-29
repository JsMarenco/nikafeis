// Third-party dependencies
import { createSlice } from "@reduxjs/toolkit"

// Current project dependencies
import initialUserState from "@/utils/states/user"
import { IInitialUserState } from "@/ts/interfaces/states/states"
import setUserReducer from "./reducers/setUser"
import setLogoutReducer from "./reducers/setLogout"
import setUserFriendRequestsSentReducer from "./reducers/setUserFriendRequestsSent"

const initialUser: IInitialUserState = initialUserState

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: setUserReducer,
    setLogout: setLogoutReducer,
    setUserFriendRequestsSent: setUserFriendRequestsSentReducer,
  },
})

export const { setUser, setLogout, setUserFriendRequestsSent } =
  userSlice.actions

export default userSlice.reducer
