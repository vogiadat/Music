import {IMusic} from '@/types/music'
import ListMusic from '@/components/Layout/ListMusic'
import {useEffect, useState} from 'react'
import {getAllMusic} from '@/services/music.service'
import {useLocation} from 'react-router-dom'
import {getSearch} from '@/utils/regex'

const Music = () => {
    const [listSong, setListSong] = useState<IMusic[]>([])
    const {search} = useLocation()
    useEffect(() => {
        const string = getSearch(search)
        getAllMusic(string).then((res) => {
            return setListSong(res.element)
        })
    }, [search])

    return (
        <>
            <div className='ml-6'>
                <div>
                    <b className='text-4xl font-extrabold'>Bài Hát</b>
                </div>
                <div className='w-full relative'>{listSong && <ListMusic listSong={listSong} />}</div>
            </div>
        </>
    )
}

export default Music
