import {IUser} from './user'

export interface Music {
    index: number
    song: IMusic
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

export interface IAlbum {
    id: string
    name: string
    authorId: string
    desc?: string
    note?: string
    image: string

    author?: IUser
    medias?: IMusic[]
}

export interface IDataUpload {
    name: string
    src: string
    image: string
    desc: string
    isPremium: boolean
    duration: number
    albumId?: string
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
