import {IMusic} from '@/types/music'
import ListMusic from '@/components/Layout/ListMusic'
import {useEffect, useState} from 'react'
import {getAllMusic} from '@/services/music.service'

const Music = () => {
    const [listSong, setListSong] = useState<IMusic[]>()
    useEffect(() => {
        getAllMusic().then((res) => {
            setListSong(res.element)
        })
    }, [])

    return (
        <>
            <div className='ml-6'>
                <div>
                    <b className='text-4xl font-extrabold'>Music</b>
                </div>
                <div className={`w-full h-[850px] overflow-y-scroll`}>
                    {listSong && <ListMusic listSong={listSong} />}
                </div>
            </div>
        </>
    )
}

export default Music
