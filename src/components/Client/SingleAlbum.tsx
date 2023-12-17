import {useEffect, useState} from 'react'
import Content from '../Layout/Content'
import {IMusic} from '@/types/music'
import {IContent} from '@/types/content'
import {useAppSelector} from '@/app/hook'

interface Music {
    index: number
    song: IMusic
}

const SingleAlbum = () => {
    const {album} = useAppSelector((state) => state.music)
    const [data, setData] = useState<Music[]>([])
    const [content, setContent] = useState<IContent>({page: 'ALBUM', title: '', subtitle: '', image: ''})

    useEffect(() => {
        if (!album) return
        setContent({
            ...content,
            title: album.name,
            subtitle: album.author?.firstName || '',
            image: album.image,
        })
        if (!album.medias) return setData([])
        setData(
            album.medias.map((song, index) => {
                return {
                    index,
                    song,
                }
            }),
        )
    }, [album])

    return (
        <>
            <Content data={data} content={content} />
        </>
    )
}

export default SingleAlbum
