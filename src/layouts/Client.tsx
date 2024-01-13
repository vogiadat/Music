import Sidebar from '@/components/Client/Sidebar'
import MusicPlayer from '@/components/Layout/MusicPlayer'
import {Toaster} from '@/components/ui/toaster'

import {useEffect} from 'react'
import {useAppDispatch} from '@/app/hook'
import {auth} from '@/features/authSlice'
import {getFavor} from '@/features/favorSlice'
import {myPlayList} from '@/features/playlistSlice'
import Navbar from '@/components/Client/Navbar'
import {Outlet} from 'react-router-dom'

const Client = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(auth())
        dispatch(getFavor())
        dispatch(myPlayList())
    }, [dispatch])

    return (
        <>
            <Toaster />
            <div className='w-screen h-screen bg-black text-white'>
                <Sidebar />
                <div className='w-5/6 fixed right-0'>
                    <Navbar />
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
