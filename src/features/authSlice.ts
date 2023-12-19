// import {useToast} from '@/components/ui/use-toast'
import {Login, Register} from '@/services/auth.service'
import {CLIENT_TOKEN} from '@/utils/constant'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMe} from '../services/user.service'
import {IUser} from '@/types/user'

// Define a type for the slice state

type TUser = {
    email: string
    password: string
}

export interface AuthState {
    accessToken: string
    user: IUser | null
}

// Define the initial state using that type
const initialState: AuthState = {
    accessToken: '',
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.user = action.payload.element
        },
        logout: (state) => {
            localStorage.removeItem(CLIENT_TOKEN)
            state.accessToken = ''
            state.user = null
        },
    },
})

export const {authLogin, logout} = authSlice.actions

export default authSlice.reducer

export const login = createAsyncThunk('auth/loginAsync', async ({email, password}: TUser, thunkApi) => {
    const params = {email, password}
    const {accessToken} = await Login(params)
    localStorage.setItem(CLIENT_TOKEN, accessToken)
    try {
        const {element} = await getMe()
        thunkApi.dispatch(authLogin({accessToken, element}))
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const register = createAsyncThunk('auth/registerAsync', async ({email, password}: TUser, thunkApi) => {
    const params = {email, password}
    await Register(params).then(async () => {
        const {accessToken} = await Login(params)
        localStorage.setItem(CLIENT_TOKEN, accessToken)
        try {
            const {element} = await getMe()
            thunkApi.dispatch(authLogin({accessToken, element}))
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
})
