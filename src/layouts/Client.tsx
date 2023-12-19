import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Outlet, Link, useLocation} from 'react-router-dom'
import {CLIENT_TOKEN, endPoint} from '@/utils/constant'
import {useEffect, useState} from 'react'
import Sidebar from '@/components/Client/Sidebar'
import {Search, Menu, ChevronDown, User, CheckCircle} from 'lucide-react'
import {errorValue} from '../utils/constant'
import {HoverCard, HoverCardContent} from '@radix-ui/react-hover-card'
import {HoverCardTrigger} from '@/components/ui/hover-card'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import {Toaster} from '@/components/ui/toaster'
import MusicPlayer from '@/components/Layout/MusicPlayer'
import {formatName} from '@/hooks/functions'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {authLogin, logout} from '@/features/authSlice'
import {useToast} from '@/components/ui/use-toast'
import {getMyFavor} from '@/services/favor.service'
import {list} from '@/features/favorSlice'
import {getMe} from '@/services/user.service'
import {addHistory} from '@/services/history.service'
import {find} from '@/features/musicSlice'
import Profile from '@/components/Client/Profile'

const navbarList = [
    {
        title: 'Music',
        slug: endPoint.music,
    },
    {
        title: 'artists',
        slug: endPoint.artist,
    },
    {
        title: 'trend',
        slug: endPoint.trend,
    },
]

const Client = () => {
    const {toast} = useToast()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)
    const {pathname} = useLocation()
    const {music} = useAppSelector((state) => state.music)
    const [isLogin, setIsLogin] = useState(true)
    const [search, setSearch] = useState('')
    const handleLogin = () => {
        setIsLogin(!isLogin)
    }

    const handleLogout = () => {
        dispatch(logout())
        if (!user) {
            toast({
                variant: 'success',
                title: 'Success',
                description: `Login success`,
            })
        }
    }

    const handleSearch = () => {
        dispatch(find(search))
    }

    useEffect(() => {
        const token = localStorage.getItem(CLIENT_TOKEN)
        getMe()
            .then(({element}) => {
                dispatch(authLogin({token, element}))
            })
            .catch(() => {
                dispatch(logout())
            })
        if (music) addHistory(music.id)
        getMyFavor().then((res) => {
            dispatch(list(res.element.rows))
        })
        if (!search) dispatch(find(''))
    }, [music, search])

    return (
        <>
            <Toaster />
            <div className='grid grid-cols-12 fixed z-20 inset-0 bg-black text-white'>
                <Sidebar />
                <div className='md:col-span-10 col-span-12'>
                    <div className='grid grid-cols-12 py-5'>
                        <div className='md:col-span-3 md:block hidden'>
                            <ul className='flex justify-evenly text-xl font-medium uppercase'>
                                {navbarList.map((item) => {
                                    const isActice = pathname === item.slug
                                    return (
                                        <li
                                            key={item.title}
                                            className={`${
                                                isActice ? 'text-secondary' : 'text-white'
                                            } hover:text-secondary hover:cursor-pointer transition-colors duration-150 ease-in-out max-2xl:text-sm`}
                                        >
                                            <Link to={item.slug}>{item.title}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='md:hidden col-span-1 m-auto'>
                            <Menu />
                        </div>
                        <div className='md:col-span-6 col-span-8'>
                            {(pathname === endPoint.music ||
                                pathname === endPoint.trend ||
                                pathname === endPoint.artist) && (
                                <div className='md:w-3/5 mx-auto relative'>
                                    <input
                                        type='text'
                                        name=''
                                        id=''
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className='bg-background w-full px-3 py-2 rounded-xl placeholder-shown:pl-10 placeholder:text-sm'
                                        placeholder='Type your search here...'
                                    />
                                    <button
                                        type='button'
                                        onClick={handleSearch}
                                        className='opacity-40 hover:text-secondary hover:opacity-60 transition-colors duration-150 ease-in-out'
                                    >
                                        <Search className='absolute inset-y-2 right-6' />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className='col-span-3'>
                            <div className='flex md:mr-20 md:justify-end justify-around'>
                                {/* <ul className='flex items-center md:ml-4'>
                                    <li>
                                        <Bell />
                                    </li>
                                    <li className='md:ml-4 md:block hidden'>
                                        <Settings />
                                    </li>
                                </ul> */}
                                <div className='flex items-center md:-my-1 md:ml-4'>
                                    {user ?
                                        <HoverCard>
                                            <HoverCardTrigger className='flex items-center md:-my-1 md:ml-4'>
                                                <Avatar>
                                                    <AvatarImage
                                                        src={user.avatar || ''}
                                                        alt=''
                                                        onError={({currentTarget}) => {
                                                            currentTarget.onerror = null // prevents looping
                                                            currentTarget.src = errorValue.image
                                                        }}
                                                    />
                                                    <AvatarFallback className='text-background text-center'>
                                                        {user.firstName}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <div className='flex hover:text-secondary hover:cursor-pointer'>
                                                            <span className='px-2 mx-auto md:flex md:items-center gap-1 hidden'>
                                                                <span className='flex items-center gap-2 text-center truncate w-24'>
                                                                    {formatName(user.firstName, user.lastName)}
                                                                    {user?.isPremium ?
                                                                        <span className='text-secondary'>
                                                                            <CheckCircle size={16} strokeWidth={3} />
                                                                        </span>
                                                                    :   <></>}
                                                                </span>
                                                            </span>
                                                            <ChevronDown />
                                                        </div>
                                                    </DialogTrigger>
                                                    <Profile user={user} />
                                                </Dialog>
                                            </HoverCardTrigger>
                                            <HoverCardContent className='ml-16 mt-2 bg-zinc-800 w-32 rounded-lg p-2'>
                                                <button className='hover:text-secondary p-2' onClick={handleLogout}>
                                                    Logout
                                                </button>
                                            </HoverCardContent>
                                        </HoverCard>
                                    :   <Dialog>
                                            <DialogTrigger>
                                                <Avatar>
                                                    <AvatarFallback className='text-background text-center hover:cursor-pointer'>
                                                        <User />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </DialogTrigger>
                                            {isLogin ?
                                                <Login handleModal={handleLogin} />
                                            :   <Register handleModal={handleLogin} />}
                                        </Dialog>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='z-10 p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <MusicPlayer />
        </>
    )
}

export default Client
