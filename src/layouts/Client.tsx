import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Outlet, Link, useLocation} from 'react-router-dom'
import {endPoint} from '@/utils/constant'
import {useAppSelector} from '@/app/hook'
import Player from '@/components/Layout/Player'
import {useEffect, useRef, useState} from 'react'
import Sidebar from '@/components/Client/Sidebar'
import {Search, Bell, Settings, Menu, ChevronDown, User} from 'lucide-react'
import {IMusic} from '@/types/music'
import {errorValue} from '../utils/constant'
import {HoverCard, HoverCardContent} from '@radix-ui/react-hover-card'
import {HoverCardTrigger} from '@/components/ui/hover-card'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import {Toaster} from '@/components/ui/toaster'

// const user = {
//     name: 'Gia Dat',
//     avatarUrl: 'https://github.com/shadcn.png',
// }
const user = null

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
    const [isLogin, setIsLogin] = useState(true)
    const {pathname} = useLocation()

    // data
    const {music, listMusic} = useAppSelector((state) => state.music)

    // ref
    const audio = useRef<HTMLAudioElement>(null)

    // handle music
    const [initMusic, setInitMusic] = useState<IMusic | null>(music)
    const [isPlay, setIsPlay] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(1)
    const [currentTime, setCurrentTime] = useState(1)

    const toggleMusic = () => {
        setIsPlay(!isPlay)
    }

    const handleTime = () => {
        const initDuration = audio.current?.duration || 1
        const initCurrentTime = audio.current?.currentTime || 1
        setCurrentTime(initCurrentTime)
        setDuration(initDuration)
        setProgress((initCurrentTime / initDuration) * 100)
    }

    const handleNextSong = () => {
        if (listMusic && music) {
            const indexMusic = listMusic.findIndex((song) => song.id === music.id)
            const indexSong = listMusic.findIndex((song) => song.id === initMusic?.id)
            const initSong = indexSong >= 0 ? indexSong : indexMusic
            const newSong = initSong + 1 >= listMusic.length ? 0 : initSong + 1
            setInitMusic(listMusic.at(newSong) || null)
        }
    }

    const handlePrevSong = () => {
        if (listMusic && music) {
            const initSong = listMusic.findIndex((song) => song.id === initMusic?.id)
            // const initSong = indexSong
            const newSong = initSong - 1 < 0 ? listMusic.length : initSong - 1
            setInitMusic(listMusic.at(newSong) || null)
        }
    }

    useEffect(() => {
        if (isPlay) {
            audio.current?.play()
            setDuration(audio.current?.duration || 1)
        } else {
            audio.current?.pause()
        }
    }, [isPlay, duration])

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
                                            } hover:text-secondary hover:cursor-pointer transition-colors duration-150 ease-in-out`}
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
                            <div className='md:w-3/5 mx-auto relative'>
                                <input
                                    type='text'
                                    name=''
                                    id=''
                                    className='bg-background w-full px-3 py-2 rounded-xl placeholder-shown:pl-10 placeholder:text-sm'
                                    placeholder='Type your search here...'
                                />
                                <button
                                    type='submit'
                                    className='opacity-40 hover:text-secondary hover:opacity-60 transition-colors duration-150 ease-in-out'
                                >
                                    <Search className='absolute inset-y-2 right-6' />
                                </button>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <div className='flex md:mr-20 md:justify-end justify-around'>
                                <ul className='flex items-center md:ml-4'>
                                    <li>
                                        <Bell />
                                    </li>
                                    <li className='md:ml-4 md:block hidden'>
                                        <Settings />
                                    </li>
                                </ul>
                                <div className='flex items-center md:-my-1 md:ml-4' onClick={() => {}}>
                                    {user ?
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <Avatar>
                                                    <AvatarImage
                                                        // src={user.avatarUrl.concat('/da') || ''}
                                                        onError={({currentTarget}) => {
                                                            currentTarget.onerror = null // prevents looping
                                                            currentTarget.src = errorValue.image
                                                        }}
                                                    />
                                                    <AvatarFallback className='text-background text-center'>
                                                        {/* {user.name[0]} */}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className='flex hover:text-secondary hover:cursor-pointer'>
                                                    {/* <span className='ml-4 md:block hidden'>{user.name}</span> */}
                                                    <ChevronDown />
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent className='ml-16 mt-2 bg-zinc-800 w-32 rounded-lg p-2'>
                                                <div className='hover:text-secondary px-2'>Logout</div>
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
                                                <Login setIsLogin={setIsLogin} />
                                            :   <Register setIsLogin={setIsLogin} />}
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
            {music && (
                <>
                    <audio ref={audio} src={initMusic?.src || music.src} onTimeUpdate={handleTime} />
                    <Player
                        song={initMusic || music}
                        setSong={setInitMusic}
                        listSong={listMusic}
                        progress={progress}
                        setProgress={setProgress}
                        isPlay={isPlay}
                        toggleMusic={toggleMusic}
                        handleNext={handleNextSong}
                        handlePrev={handlePrevSong}
                        duration={duration}
                    />
                </>
            )}
        </>
    )
}

export default Client
