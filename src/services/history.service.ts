import api, {ResponseSuccess} from '@/configs/axios'
import {IPlaylist} from '@/types/music'

export const getHistory = async () => {
    const res = await api.get<ResponseSuccess<IPlaylist>>('/history')
    return res.data
}
