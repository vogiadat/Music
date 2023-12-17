import api, {ResponseSuccess} from '@/configs/axios'
import {IUser} from '@/types/user'

export const getMe = async () => {
    const res = await api.get<ResponseSuccess<IUser>>('/user/me')
    return res.data
}

export const getAllArtist = async () => {
    const res = await api.get<ResponseSuccess<IUser[]>>('/user/singers')
    return res.data
}

export const buytPremium = async () => {
    const res = await api.post<ResponseSuccess<string>>('/payment')
    return res.data
}
