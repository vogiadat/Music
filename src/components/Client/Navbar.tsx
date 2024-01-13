import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import {useToast} from '@/components/ui/use-toast'
import Profile from '@/components/Client/Profile'

import {FormEvent, useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Search, Menu, ChevronDown, User, CheckCircle} from 'lucide-react'
import {endPoint, errorValue} from '@/utils/constant'
import {formatName} from '@/hooks/functions'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {auth, logout, openLogin} from '@/features/authSlice'
import {Button} from '@/components/ui/button'
import Auth from '@/pages/Auth'

const Navbar = () => {
    const dispatch = useAppDispatch()
    const {toast} = useToast()
    const {user} = useAppSelector((state) => state.auth)
    const {pathname} = useLocation()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleModal = () => {
        dispatch(openLogin())
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

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(endPoint.music.concat(`?search=${search}`))
    }

    useEffect(() => {
        dispatch(auth())
    }, [dispatch])
    return (
        <>
            <div className='grid grid-cols-12 py-5'>
                <div className='md:col-span-4 md:block hidden'>
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
                <div className='md:col-span-5 col-span-8'>
                    <form className='md:w-3/5 mx-auto relative' onSubmit={handleSearch}>
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
                            type='submit'
                            className='opacity-40 hover:text-secondary hover:opacity-60 transition-colors duration-150 ease-in-out'
                        >
                            <Search className='absolute inset-y-2 right-6' />
                        </button>
                    </form>
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
                                    <HoverCardContent className='ml-16 border-none mt-2 bg-secondary w-28 rounded-lg p-2'>
                                        <Button
                                            className='w-full bg-transparent font-bold uppercase text-white hover:bg-white hover:bg-opacity-60 hover:text-secondary p-2 transition-colors duration-150 ease-in-out'
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </HoverCardContent>
                                </HoverCard>
                            :   <Dialog>
                                    <DialogTrigger>
                                        <Avatar onClick={handleModal}>
                                            <AvatarFallback className='text-background text-center hover:cursor-pointer'>
                                                <User />
                                            </AvatarFallback>
                                        </Avatar>
                                    </DialogTrigger>
                                    <Auth />
                                </Dialog>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar

const navbarList = [
    {
        title: 'Bài Hát',
        slug: endPoint.music,
    },
    {
        title: 'Nghệ Sĩ',
        slug: endPoint.artist,
    },
    {
        title: 'Thịnh Hành',
        slug: endPoint.trend,
    },
    {
        title: 'Thể Loại',
        slug: endPoint.category,
    },
]
