import api, {ResponseSuccess} from '@/configs/axios'
import {IMusic} from '@/types/music'

export const getAllMusic = async () => {
    const res = await api.get<ResponseSuccess<IMusic[]>>('/media')
    return res.data
}
