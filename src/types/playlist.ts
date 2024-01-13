import {IMusic} from './music'

export interface IPlaylist {
    id: string
    name: string
    authorId: string
    playlistAndMusics: TPlaylist[]
}

export type TPlaylist = {
    id: string
    playlistId: string
    mediaId: string
    media: IMusic
}
