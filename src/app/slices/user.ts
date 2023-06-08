// Third-party dependencies
import { createSlice } from "@reduxjs/toolkit"

// Current project dependencies
import initialUserState from "@/utils/states/user"
import { IInitialUserState } from "@/ts/interfaces/states/states"
import setUserReducer from "./reducers/setUser"
import setLogoutReducer from "./reducers/setLogout"
import setUserFriendRequestsSentReducer from "./reducers/setUserFriendRequestsSent"
import setUserFriendsReducer from "./reducers/setUserFriends"
import setUserFriendRequestsReducer from "./reducers/setUserFriendRequests"

const initialUser: IInitialUserState = initialUserState

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: setUserReducer,
    setLogout: setLogoutReducer,
    setUserFriendRequestsSent: setUserFriendRequestsSentReducer,
    setUserFriends: setUserFriendsReducer,
    setUserFriendRequests: setUserFriendRequestsReducer,
  },
})

export const {
  setUser,
  setLogout,
  setUserFriendRequestsSent,
  setUserFriends,
  setUserFriendRequests,
} = userSlice.actions

export default userSlice.reducer
