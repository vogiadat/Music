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
    isLogin: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
    accessToken: '',
    user: null,
    isLogin: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action) => {
            {
                return {
                    ...state,
                    accessToken: action.payload.accessToken,
                    user: action.payload.element,
                }
            }
        },
        logout: (state) => {
            localStorage.removeItem(CLIENT_TOKEN)
            return {
                ...state,
                accessToken: '',
                user: null,
            }
        },
        openLogin: (state) => {
            return {
                ...state,
                isLogin: true,
            }
        },
        openRegister: (state) => {
            return {
                ...state,
                isLogin: false,
            }
        },
    },
})

export const {authLogin, logout, openLogin, openRegister} = authSlice.actions

export default authSlice.reducer

export const auth = createAsyncThunk<void, void>('auth/user', async (_, thunkApi) => {
    const token = localStorage.getItem(CLIENT_TOKEN)
    try {
        const {element} = await getMe()
        thunkApi.dispatch(authLogin({token, element}))
    } catch (error) {
        thunkApi.dispatch(logout())
        return thunkApi.rejectWithValue(error)
    }
})

export const login = createAsyncThunk('auth/login', async ({email, password}: TUser, thunkApi) => {
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

export const register = createAsyncThunk('auth/register', async ({email, password}: TUser, thunkApi) => {
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
