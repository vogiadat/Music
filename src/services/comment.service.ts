import api, {PaginationSuccess} from '@/configs/axios'
import {IComment} from '@/types/music'

export const getComment = async (id: string) => {
    const res = await api.get<PaginationSuccess<IComment[]>>(`/comment/music/${id}`)
    return res.data.element
}

export const sendComment = async (params: {mediaId: string; message: string}) => {
    const res = await api.post('/comment', params)
    return res
}
