import {createSlice} from '@reduxjs/toolkit'
import {IMusic} from '@/types/music'

// Define a type for the slice state
export interface MusicState {
    music: null | IMusic
    listMusic: null | IMusic[]
}

// Define the initial state using that type
const initialState: MusicState = {
    music: null,
    listMusic: null,
}

export const musicSlice = createSlice({
    name: 'player',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setMusic: (state, action) => {
            const {song, listSong} = action.payload
            state.music = song
            state.listMusic = listSong
        },
    },
})

export const {setMusic} = musicSlice.actions

export default musicSlice.reducer
