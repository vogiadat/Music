import {createSlice} from '@reduxjs/toolkit'
import {IAlbum, IMusic} from '@/types/music'

export interface MusicState {
    search?: string | ''
    music: IMusic | null
    listMusic: IMusic[] | null
    album?: IAlbum | null
}

// Define the initial state using that type
const initialState: MusicState = {
    search: '',
    music: null,
    listMusic: null,
    album: null,
}

export const musicSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        currentSong: (state, action) => {
            const {song, listSong} = action.payload
            state.music = song
            state.listMusic = listSong
        },
        setCurrentSong: (state, action) => {
            return {
                ...state,
                music: action.payload,
            }
        },
        setListSong: (state, action) => {
            return {
                ...state,
                album: action.payload,
            }
        },
        find: (state, action) => {
            return {
                ...state,
                search: action.payload,
            }
        },
    },
})

export const {currentSong, setCurrentSong, setListSong, find} = musicSlice.actions

export default musicSlice.reducer
