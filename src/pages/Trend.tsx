import {IFavor, IMusic} from '@/types/music'
import ListMusic from '@/components/Layout/ListMusic'
import {useEffect, useState} from 'react'
import {getAllTrending} from '@/services/music.service'

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
                    <b className='text-4xl font-extrabold'>Trend</b>
                </div>
                <div className={`w-full h-[850px] mt-5 overflow-y-scroll`}>
                    <ListMusic listSong={listSong || []} />
                    <div className='grid grid-flow-col py-2'></div>
                </div>
            </div>
        </>
    )
}

export default Trend
