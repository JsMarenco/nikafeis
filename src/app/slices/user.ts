// Third-party dependencies
import { createSlice } from "@reduxjs/toolkit"

// Current project dependencies
import initialUserState from "@/utils/states/user"
import { IInitialUserState } from "@/ts/interfaces/states/states"

const initialUser: IInitialUserState = initialUserState

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {},
})

export default userSlice.reducer
