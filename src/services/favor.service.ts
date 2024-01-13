import api, {PaginationSuccess, ResponseSuccess} from '@/configs/axios'
import {IFavor} from '@/types/music'

export const getMyFavor = async () => {
    const res = await api.get<PaginationSuccess<IFavor>>('/favorite/my-favorite')
    return res.data
}

export const addToFavor = async (id: string) => {
    const res = await api.post('/favorite', {mediaId: id})
    return res.data
}

export const delFromFavor = async (id: string) => {
    const res = await api.delete(`/favorite/${id}`)
    return res.data
}

export const getAllTrending = async () => {
    const res = await api.get<ResponseSuccess<IFavor[]>>('/favorite/trending')
    return res.data
}
