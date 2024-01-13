import api, {ResponseSuccess} from '@/configs/axios'
import {IAlbum, IMusic} from '@/types/music'

export const getAllMusic = async (search: string) => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(search ? `/media?search=${search}` : '/media')
    return res.data
}

export const getMusicByArtist = async (id: string) => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(`/media/user/${id}`)
    return res.data
}

export const increaseListenMusic = async (id: string) => {
    const res = await api.patch(`/media/increase/${id}`)
    return res.data
}

export const getAllAlbums = async () => {
    const res = await api.get<ResponseSuccess<IAlbum[]>>('/album/singer')
    return res.data
}
