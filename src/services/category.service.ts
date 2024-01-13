import api, {PaginationSuccess, ResponseSuccess} from '@/configs/axios'
import {IAlbum} from '@/types/music'

export const getAllCategory = async () => {
    const res = await api.get<PaginationSuccess<IAlbum[]>>('/mediatype')
    return res.data
}

export const getCategoryById = async (id: string) => {
    const res = await api.get<ResponseSuccess<IAlbum>>(`/mediatype/${id}`)
    return res.data
}
