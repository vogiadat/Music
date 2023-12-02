import axios from 'axios'

const api = axios.create({
    baseURL: 'localhost:8080',
})

api.interceptors.response.use(
    (config) => config,
    (error) => {
        const msg = error?.response?.data?.message || error.message
        throw new Error(msg)
    },
)

export default api
