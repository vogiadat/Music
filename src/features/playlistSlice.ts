import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {IAddPlaylist, IPlaylist} from '@/types/playlist'
import {addSongToPlaylist, delSongFromPlaylist, getMyPlaylist} from '@/services/playlist.service'
import {RootState} from '@/app/store'

// Define a type for the slice state
export interface PlaylistState {
    myList: IPlaylist[]
    listSong: null | IPlaylist
}

// Define the initial state using that type
const initialState: PlaylistState = {
    myList: [],
    listSong: null,
}

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        list: (state, action) => {
            return {
                ...state,
                myList: action.payload,
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

export const detailPlayList = createAsyncThunk('playlist/detail', async (params: IPlaylist, thunkApi) => {
    try {
        thunkApi.dispatch(detail(params))
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const myPlayList = createAsyncThunk<void, void>('playlist/my-list', async (_, thunkApi) => {
    try {
        const res = await getMyPlaylist()
        thunkApi.dispatch(list(res.element.rows))
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const addToPlaylist = createAsyncThunk('playlist/add', async (data: IAddPlaylist, thunkApi) => {
    try {
        await addSongToPlaylist(data)
        thunkApi.dispatch(myPlayList())
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const delFromPlaylist = createAsyncThunk<void, string, {state: RootState}>(
    'playlist/remove',
    async (id: string, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const {listSong} = state.playlist

            if (listSong) {
                const newList = listSong.playlistAndMusics.filter((song) => song.id !== id)

                const newDetail = {...listSong, playlistAndMusics: newList}

                await delSongFromPlaylist(id)
                thunkApi.dispatch(detailPlayList(newDetail))
                thunkApi.dispatch(myPlayList())
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)
