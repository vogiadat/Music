import api, {PaginationSuccess} from '@/configs/axios'
import {IFavor} from '@/types/music'

export const getDownload = async () => {
    const res = await api.get<PaginationSuccess<IFavor[]>>(`/download/me`)
    return res.data.element
}

export const addDownload = async (mediaId: string) => {
    const res = await api.post('/download', {mediaId})
    return res.data
}
