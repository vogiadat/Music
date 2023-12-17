import {useEffect, useState} from 'react'
import Content from '../Layout/Content'
import {IMusic} from '@/types/music'
import {IContent} from '@/types/content'
import {getMusicByArtist} from '@/services/music.service'
import {useLocation} from 'react-router-dom'

interface Music {
    index: number
    song: IMusic
}

const SingleArtist = () => {
    const [data, setData] = useState<Music[]>([])
    const [content, setContent] = useState<IContent>({page: 'ARTIST', title: '', subtitle: '', image: ''})
    const {pathname} = useLocation()
    const artistId = pathname.split('/artist/').at(1) || ''

    useEffect(() => {
        getMusicByArtist(artistId).then((res) => {
            setData(
                res.element.map((song, index) => {
                    return {index, song}
                }),
            )
        })
    }, [artistId])

    return (
        <>
            <Content data={data} content={content} />
        </>
    )
}

export default SingleArtist
