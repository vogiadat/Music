import {useAppDispatch, useAppSelector} from '@/app/hook'
import {Single} from '@/components/Client/Favorite'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import {formatName} from '@/hooks/functions'
import {IContent} from '@/types/content'
import {IMusic} from '@/types/music'
import {endPoint} from '@/utils/constant'
import {Heart} from 'lucide-react'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Auth from './Auth'
import {openLogin} from '@/features/authSlice'

interface Music {
    index: number
    song: IMusic
}

const Favourite = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)
    const {listFavor} = useAppSelector((state) => state.favor)
    const [data, setData] = useState<Music[]>([])
    const [content, setContent] = useState<IContent>({
        page: 'FAVORITE',
        title: 'Liked Songs',
        subtitle: '',
        image: '',
        avatar: '',
    })

    const handleModal = () => {
        dispatch(openLogin())
    }

    useEffect(() => {
        if (!user) return
        setContent({
            ...content,
            subtitle: formatName(user.firstName, user.lastName),
            avatar: user.avatar,
            image: '',
        })
        if (listFavor) {
            const listSong: IMusic[] = listFavor.map((song) => song.media)
            setData(
                listSong.map((song, index) => {
                    return {index, song}
                }),
            )
        }
    }, [user, listFavor])

    return (
        <>
            {!user ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <Heart size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s add new favorite song</b>
                        <p className='text-xl'>Need to login to favorite</p>
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
            : data.length <= 0 ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <Heart size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s add new favorite song</b>
                        <p className='text-xl'>Go to list song to add new favorite</p>
                        <Link
                            to={endPoint.music}
                            className='mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                        >
                            Listen music
                        </Link>
                    </div>
                </div>
            :   <Single data={data} content={content} />}
        </>
    )
}

export default Favourite
