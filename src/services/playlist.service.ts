import api, {PaginationSuccess} from '@/configs/axios'
import {IPlaylist} from '@/types/playlist'

export const getMyPlaylist = async () => {
    const res = await api.get<PaginationSuccess<IPlaylist>>('/playlist/my-playlist')
    return res.data
}
