import api, {ResponseSuccess} from '@/configs/axios'
import {IDataUpload, IMusic} from '@/types/music'

export const upload = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const res = await api.post<{data: {url: string}}>('/upload', form)
    return res.data.data.url
}

export const createMusic = async (data: IDataUpload) => {
    const res = await api.post('/media', data)
    return res
}

export const getMyMusic = async () => {
    const res = await api.get<ResponseSuccess<IMusic[]>>(`/media/my-music/me`)
    return res.data
}
