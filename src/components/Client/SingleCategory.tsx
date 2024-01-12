import {useEffect, useState} from 'react'
import Content from '../Layout/Content'
import {IMusic} from '@/types/music'
import {IContent} from '@/types/content'
import {useLocation} from 'react-router-dom'
import {getCategoryById} from '@/services/category.service'

interface Music {
    index: number
    song: IMusic
}

const SingleCategory = () => {
    const {pathname} = useLocation()
    const [data, setData] = useState<Music[]>([])
    const [content, setContent] = useState<IContent>({page: 'CATEGORY', title: '', subtitle: '', image: ''})

    useEffect(() => {
        const typeId = pathname.split('/').at(2)
        const getCategory = async () => {
            const {element} = await getCategoryById(typeId || '')
            const listSong = element.medias
            setContent({...content, title: element.name, image: element.image})
            if (listSong)
                setData(
                    listSong.map((song, index) => {
                        return {
                            song,
                            index,
                        }
                    }),
                )
        }
        getCategory()
    }, [pathname])

    return (
        <>
            <Content data={data} content={content} />
        </>
    )
}

export default SingleCategory
