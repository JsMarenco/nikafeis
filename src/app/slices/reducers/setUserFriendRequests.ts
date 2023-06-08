// Third-party dependencies
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

// Current project dependencies
import { IInitialUserState } from "@/ts/interfaces/states/states"

const setUserFriendRequestsReducer: CaseReducer<
  IInitialUserState,
  PayloadAction<string[]>
> = (state, action) => {
  state.relationships.friendRequests = action.payload
}

export default setUserFriendRequestsReducer
