import {createSlice} from '@reduxjs/toolkit'
import {IAlbum, IMusic} from '@/types/music'

export interface MusicState {
    music: IMusic | null
    listMusic: IMusic[] | null
    album?: IAlbum | null
}

// Define the initial state using that type
const initialState: MusicState = {
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
    },
})

export const {currentSong, setCurrentSong, setListSong} = musicSlice.actions

export default musicSlice.reducer
