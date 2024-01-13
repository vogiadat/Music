import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {IPlaylist} from '@/types/playlist'
import {getMyPlaylist} from '@/services/playlist.service'

// Define a type for the slice state
export interface PlaylistState {
    playlist: IPlaylist[]
    listSong: null | IPlaylist
}

// Define the initial state using that type
const initialState: PlaylistState = {
    playlist: [],
    listSong: null,
}

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        list: (state, action) => {
            return {
                ...state,
                playlist: action.payload,
            }
        },
        detail: (state, action) => {
            return {
                ...state,
                listSong: action.payload,
            }
        },
    },
})

export const {list, detail} = playlistSlice.actions

export default playlistSlice.reducer

export const myPlayList = createAsyncThunk<void, void>('playlist/my-list', async (_, thunkApi) => {
    try {
        const res = await getMyPlaylist()
        thunkApi.dispatch(list(res.element.rows))
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
