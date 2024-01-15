import {useAppDispatch, useAppSelector} from '@/app/hook'
import {List} from '@/components/Client/PlayList'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import {ListVideo} from 'lucide-react'
import Auth from './Auth'
import {openLogin} from '@/features/authSlice'

const MyPlaylist = () => {
    const dispatch = useAppDispatch()
    const {myList} = useAppSelector((state) => state.playlist)
    const {user} = useAppSelector((state) => state.auth)

    const handleModal = () => {
        dispatch(openLogin())
    }

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
            :   <List title='Danh Sách Phát' list={myList} />}
        </>
    )
}

export default MyPlaylist
