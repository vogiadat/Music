import {useAppSelector} from '@/app/hook'
import Login from './Login'
import Register from './Register'

const Auth = () => {
    const {isLogin} = useAppSelector((state) => state.auth)
    return isLogin ? <Login /> : <Register />
}

export default Auth
