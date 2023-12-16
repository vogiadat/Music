import {configureStore} from '@reduxjs/toolkit'
import musicSlice from '../features/musicSlice'
import authSlice from '@/features/authSlice'
import favorSlice from '@/features/favorSlice'
// ...

const store = configureStore({
    reducer: {
        music: musicSlice,
        auth: authSlice,
        favor: favorSlice,
    },
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
