import api, {ResPaginationSuccess} from '@/configs/axios'
import {IFavor} from '@/types/music'

export const getHistory = async () => {
    const res = await api.get<ResPaginationSuccess<IFavor[]>>('/history')
    return res.data
}

export const addHistory = async (mediaId: string) => {
    const res = await api.post(`/history`, {mediaId})
    return res.data
}
