import {createSlice} from '@reduxjs/toolkit'
import {IMusic} from '@/types/music'

// Define a type for the slice state
export interface MusicState {
    music: null | IMusic
}

// Define the initial state using that type
const initialState: MusicState = {
    music: null,
}

export const musicSlice = createSlice({
    name: 'player',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setMusic: (state, action) => {
            state.music = action.payload
        },
    },
})

export const {setMusic} = musicSlice.actions

export default musicSlice.reducer
