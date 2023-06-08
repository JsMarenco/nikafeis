// Third-party dependencies
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

// Current project dependencies
import { IInitialUserState } from "@/ts/interfaces/states/states"

const setUserFriendsReducer: CaseReducer<
  IInitialUserState,
  PayloadAction<string[]>
> = (state, action) => {
  state.relationships.friends = action.payload
}

export default setUserFriendsReducer
