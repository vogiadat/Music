import {Login} from '@/services/auth.service'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

// Define a type for the slice state

type TUser = {
    email: string
    password: string
}

export interface AuthState {
    accessToken: string
    user: TUser
}

// Define the initial state using that type
const initialState: AuthState = {
    accessToken: '',
    user: {
        email: '',
        password: '',
    },
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.user = action.payload.params
        },
    },
})

export const {authLogin} = authSlice.actions

export default authSlice.reducer

export const login = createAsyncThunk('auth/loginAsync', async ({email, password}: TUser, thunkApi) => {
    try {
        const params = {email, password}
        const {accessToken} = await Login(params)
        thunkApi.dispatch(authLogin({accessToken, params}))
    } catch (error) {
        console.log(error)
    }
})
