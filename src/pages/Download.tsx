import ListMusic from '@/components/Layout/ListMusic'
import {DownloadIcon} from 'lucide-react'
import {Link} from 'react-router-dom'
import {IMusic} from '../types/music'
import {useEffect, useState} from 'react'
import {getDownload} from '@/services/download.service'
import {endPoint} from '@/utils/constant'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import Auth from './Auth'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {openLogin} from '@/features/authSlice'

const Download = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)
    const [listSong, setListSong] = useState<IMusic[]>([])

    const handleModal = () => {
        dispatch(openLogin())
    }

    useEffect(() => {
        getDownload().then((res) => {
            setListSong(res.rows.map((item) => item.media))
        })
    }, [])

    return (
        <>
            {!user ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <DownloadIcon size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s download new song</b>
                        <p className='text-xl'>Need to login to download</p>
                        <Dialog>
                            <DialogTrigger>
                                <div
                                    className='mx-auto w-32 text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                                    onClick={handleModal}
                                >
                                    Login
                                </div>
                            </DialogTrigger>
                            <Auth />
                        </Dialog>
                    </div>
                </div>
            : listSong.length <= 0 ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <DownloadIcon size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s download new song</b>
                        <p className='text-xl'>Need to login to download</p>
                        <Link
                            to={endPoint.music}
                            className='mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                        >
                            Listen music
                        </Link>
                    </div>
                </div>
            :   <div className='ml-6'>
                    <div>
                        <b className='text-4xl font-extrabold'>Download</b>
                    </div>
                    <div className={`w-full h-[850px] overflow-y-scroll`}>
                        <ListMusic listSong={listSong} />
                    </div>
                </div>
            }
        </>
    )
}

export default Download
