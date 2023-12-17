import axios from 'axios'
import {CLIENT_TOKEN} from '@/utils/constant'

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(CLIENT_TOKEN)

        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (config) => config,
    (error) => {
        const msg = error?.response?.data?.message || error.message
        throw new Error(msg)
    },
)

export interface ResponseSuccess<T> {
    status: number
    message: string
    element: T
}

export interface ResPaginationSuccess<T> {
    status: number
    message: string
    element: {
        rows: T
        total: number
        skip: number
        limit: number
        page: number
    }
}

export default api
