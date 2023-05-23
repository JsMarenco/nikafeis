// Third-party dependencies
import { configureStore } from "@reduxjs/toolkit"

// Current project dependencies
import userSlices from "./slices/user"

export const store = configureStore({
  reducer: {
    user: userSlices,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
