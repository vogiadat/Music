import {IMusic} from './music'

export interface IPlaylist {
    id: string
    name: string
    image?: string
    authorId: string
    playlistAndMusics: TPlaylist[]
}

export type TPlaylist = {
    id: string
    playlistId: string
    mediaId: string
    media: IMusic
}

export interface IAddPlaylist {
    playListId: string
    mediaId: string
}
