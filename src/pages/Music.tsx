import {IMusic} from '@/types/music'
import ListMusic from '@/components/Layout/ListMusic'
import {useEffect, useState} from 'react'
import {getAllMusic} from '@/services/music.service'
import {useAppSelector} from '@/app/hook'

const Music = () => {
    const {search} = useAppSelector((state) => state.music)
    const [listSong, setListSong] = useState<IMusic[]>([])
    useEffect(() => {
        getAllMusic(search || '').then((res) => {
            return setListSong(res.element)
        })
    }, [search])

    return (
        <>
            <div className='ml-6'>
                <div>
                    <b className='text-4xl font-extrabold'>Music</b>
                </div>
                <div className='w-full relative'>{listSong && <ListMusic listSong={listSong} />}</div>
            </div>
        </>
    )
}

export default Music
