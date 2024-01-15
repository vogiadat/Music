import api, {PaginationSuccess} from '@/configs/axios'
import {IAddPlaylist, IPlaylist} from '@/types/playlist'

export const getMyPlaylist = async () => {
    const res = await api.get<PaginationSuccess<IPlaylist>>('/playlist/my-playlist')
    return res.data
}

export const createPlaylist = async (name: string) => {
    const res = await api.post('/playlist', {name})
    return res.data
}

export const addSongToPlaylist = async (data: IAddPlaylist) => {
    const res = await api.post('/playlist/addMusicToPlaylist', data)
    return res.data
}

export const delSongFromPlaylist = async (id: string) => {
    const res = await api.delete(`/playlist/removePlaylistMusic/${id}`)
    return res.data
}

export const deletePlaylist = async (id: string) => {
    const res = await api.delete(`/playlist/${id}`)
    return res.data
}
