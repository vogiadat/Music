import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {IFavor} from '@/types/music'
import {addToFavor, delFromFavor, getMyFavor} from '@/services/favor.service'

// Define a type for the slice state
export interface FavorState {
    listFavor: null | IFavor[]
}

// Define the initial state using that type
const initialState: FavorState = {
    listFavor: null,
}

export const favorSlice = createSlice({
    name: 'favor',
    initialState,
    reducers: {
        list: (state, action) => {
            state.listFavor = action.payload
        },
    },
})

export const {list} = favorSlice.actions

export default favorSlice.reducer

export const addFavor = createAsyncThunk('favor/add', async (id: string, thunkApi) => {
    try {
        await addToFavor(id)
        const res = await getMyFavor()
        thunkApi.dispatch(list(res.element.rows))
    } catch (err) {
        console.log(err)
    }
})

export const delFavor = createAsyncThunk('favor/remove', async (id: string, thunkApi) => {
    try {
        await delFromFavor(id)
        const res = await getMyFavor()
        thunkApi.dispatch(list(res.element.rows))
    } catch (error) {
        console.log(error)
    }
})
