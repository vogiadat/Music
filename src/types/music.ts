import {IUser} from './user'

export interface IAlbum {
    id: string
    name: string
    authorId: string
    desc: string
    image: string

    author?: IUser
    medias?: IMusic[]
}

export interface IMusic {
    id: string
    name: string
    desc: string
    image: string
    src: string
    authorId: string
    duration: number
    isPremium: boolean
    albumId?: string
    author?: IUser
    album?: IAlbum
}

export interface IDataUpload {
    name: string
    src: string
    image: string
    desc: string
    isPremium: boolean
    albumId?: string
}

export interface IPlaylist {
    rows: IMusic[]
    total: number
    skip: number
    limit: number
    page: number
}

export interface IComment {
    id: string
    mediaId: string
    authorId: string
    author: IUser
    message: string
    createAt: string
    updateAt: string
}
export interface IFavor {
    id: string
    media: IMusic
    mediaId: string
    createAt: string
    updateAt: string
}

export interface Music {
    index: number
    song: IMusic
}
