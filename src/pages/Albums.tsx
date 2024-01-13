import {List} from '@/components/Client/Albums'
import {getAllAlbums} from '@/services/music.service'
import {IAlbum} from '@/types/music'
import {useEffect, useState} from 'react'

const Albums = () => {
    const [listAlbum, setListAlbum] = useState<IAlbum[]>([])
    useEffect(() => {
        getAllAlbums().then((res) => {
            setListAlbum(res.element)
        })
    }, [])

    return (
        <>
            <List title='Albums' list={listAlbum} />
        </>
    )
}

export default Albums
