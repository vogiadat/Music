import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Outlet, Link, useLocation} from 'react-router-dom'
import {endPoint} from '@/utils/constant'
import {useAppSelector} from '@/app/hook'
import Player from '@/components/Music/Player'
// import {useEffect, useRef, useState} from 'react'
import Sidebar from '@/components/Client/Sidebar'
import {Search, Bell, Settings, Menu} from 'lucide-react'

const user = {
    name: 'Gia Dat',
    avatarUrl: 'https://github.com/shadcn.png',
}

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
    const {music} = useAppSelector((state) => state.music)
    const {pathname} = useLocation()

    return (
        <>
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
                                <div className='flex items-center md:-my-1 md:ml-4'>
                                    <Avatar>
                                        <AvatarImage src={user.avatarUrl} alt={user.name[0]} />
                                        <AvatarFallback>{user.name}</AvatarFallback>
                                    </Avatar>
                                    <span className='ml-4 md:block hidden'>CN</span>
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
                    <Player initMusic={music} />
                </>
            )}
        </>
    )
}

export default Client
