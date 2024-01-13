import {IMusic} from '@/types/music'
import ListMusic from '@/components/Layout/ListMusic'
import {useEffect, useState} from 'react'
import {getAllTrending} from '@/services/favor.service'

const Trend = () => {
    const [listSong, setListSong] = useState<IMusic[]>([])

    useEffect(() => {
        getAllTrending().then((res) => {
            const list = res.element.map((song) => song.media)
            setListSong(list)
        })
    }, [])

    return (
        <>
            <div className='ml-6'>
                <div>
                    <b className='text-4xl font-extrabold'>Thịnh Hành</b>
                </div>
                <div className='w-full relative'>{listSong && <ListMusic listSong={listSong} />}</div>
            </div>
        </>
    )
}

export default Trend
