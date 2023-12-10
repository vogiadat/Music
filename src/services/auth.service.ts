import api from '@/configs/axios'

interface params {
    email: string
    password: string
}

export const Login = async ({email, password}: params) => {
    const res = await api.post('/auth/login', {email, password})
    return res.data.element
}
