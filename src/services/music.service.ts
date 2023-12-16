import api, {ResponseSuccess, ResPaginationSuccess} from '@/configs/axios'
import {IAlbum, IFavor, IMusic} from '@/types/music'

export const getAllMusic = async () => {
    const res = await api.get<ResponseSuccess<IMusic[]>>('/media')
    return res.data
}

export const getAllTrending = async () => {
    const res = await api.get<ResponseSuccess<IFavor[]>>('/favorite/trending')
    return res.data
}

export const getMusicByArtist = async (id: string) => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(`/media/singer/${id}`)
    return res.data
}

export const getAllAlbums = async () => {
    const res = await api.get<ResponseSuccess<IAlbum[]>>('/album/singer')
    return res.data
}
