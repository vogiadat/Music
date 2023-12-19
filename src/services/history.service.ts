import api from '@/configs/axios'

export const getHistory = async () => {
    const res = await api.get('/history')
    return res.data
}

export const addHistory = async (mediaId: string) => {
    const res = await api.post(`/history`, {mediaId})
    return res.data
}
