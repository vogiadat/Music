import {useAppDispatch, useAppSelector} from '@/app/hook'
import {List} from '@/components/Client/PlayList'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import {myPlayList} from '@/features/playlistSlice'
import {endPoint} from '@/utils/constant'
import {ListVideo} from 'lucide-react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Auth from './Auth'
import {openLogin} from '@/features/authSlice'

const MyPlaylist = () => {
    const dispatch = useAppDispatch()
    const {playlist} = useAppSelector((state) => state.playlist)
    const {user} = useAppSelector((state) => state.auth)

    const handleModal = () => {
        dispatch(openLogin())
    }

    useEffect(() => {
        dispatch(myPlayList())
    }, [])

    return (
        <>
            {!user ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <ListVideo size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s create new playlist</b>
                        <p className='text-xl'>Need to login to playlist</p>
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
            : playlist.length <= 0 ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <ListVideo size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s create new playlist</b>
                        <Link
                            to={endPoint.music}
                            className='mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                        >
                            Listen music
                        </Link>
                    </div>
                </div>
            :   <List title='Danh Sách Phát' list={playlist} />}
        </>
    )
}

export default MyPlaylist
