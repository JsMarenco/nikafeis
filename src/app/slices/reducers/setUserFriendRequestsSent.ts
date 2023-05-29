// Third-party dependencies
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

// Current project dependencies
import { IInitialUserState } from "@/ts/interfaces/states/states"

const setUserFriendRequestsSentReducer: CaseReducer<
  IInitialUserState,
  PayloadAction<string[]>
> = (state, action) => {
  state.relationships.friendRequestsSent = action.payload
}

export default setUserFriendRequestsSentReducer
