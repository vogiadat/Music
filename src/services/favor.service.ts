import api, {ResPaginationSuccess} from '@/configs/axios'
import {IPlaylist} from '@/types/music'

export const getMyFavor = async () => {
    const res = await api.get<ResPaginationSuccess<IPlaylist>>('/favorite/my-favorite')
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
