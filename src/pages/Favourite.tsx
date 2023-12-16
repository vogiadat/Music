import {useAppSelector} from '@/app/hook'
import Content from '@/components/Layout/Content'
import {formatName} from '@/hooks/functions'
import {IContent} from '@/types/content'
import {IMusic} from '@/types/music'
import {useEffect, useState} from 'react'

interface Music {
    index: number
    song: IMusic
}

const Favourite = () => {
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
            <Content data={data} content={content} />
        </>
    )
}

export default Favourite
