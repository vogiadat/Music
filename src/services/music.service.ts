import api, {ResponseSuccess, ResPaginationSuccess} from '@/configs/axios'
import {IAlbum, IComment, IDataUpload, IFavor, IMusic} from '@/types/music'

export const getAllMusic = async (search: string) => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(search ? `/media?search=${search}` : '/media')
    return res.data
}

export const getAllTrending = async () => {
    const res = await api.get<ResponseSuccess<IFavor[]>>('/favorite/trending')
    return res.data
}

export const getMusicByArtist = async (id: string) => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(`/media/user/${id}`)
    return res.data
}

export const getAllAlbums = async () => {
    const res = await api.get<ResponseSuccess<IAlbum[]>>('/album/singer')
    return res.data
}

export const getMyMusic = async () => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(`/media/my-music/me`)
    return res.data
}

export const getComment = async (id: string) => {
    const res = await api.get<ResPaginationSuccess<IComment[]>>(`/comment/music/${id}`)
    return res.data.element
}

export const sendComment = async (params: {mediaId: string; message: string}) => {
    const res = await api.post('/comment', params)
    return res
}

export const upload = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const res = await api.post<{data: {url: string}}>('/upload', form)
    return res.data.data.url
}

export const createMusic = async (data: IDataUpload) => {
    const res = await api.post('/media', data)
    return res
}

export const getDownload = async () => {
    const res = await api.get<ResPaginationSuccess<IFavor[]>>(`/download/me`)
    return res.data.element
}

export const addDownload = async (mediaId: string) => {
    const res = await api.post('/download', {mediaId})
    return res.data
}
