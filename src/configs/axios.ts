import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API,
})

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

export default api
