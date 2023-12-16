import React, {useEffect, useState} from 'react'
import Content from '../Layout/Content'
import {IAlbum, IMusic} from '@/types/music'
import {IContent} from '@/types/content'
import {getAllMusic} from '@/services/music.service'
import {getAllArtist} from '@/services/user.service'

const data: IAlbum = {
    id: '1',
    name: 'Ai Cũng Phải Bắt Đầu Từ Đâu Đó',
    authorId: 'artist1',
    desc: 'New album',
    image: 'https://i.scdn.co/image/ab67616d0000b2738a063486be97d863207e1ca4',
    medias: [
        {
            id: '1',
            name: 'Exit Sign',
            desc: '',
            image: '',
            src: '',
            authorId: 'artist1',
            isPremium: true,
        },
    ],
}

const SingleArtist = () => {
    const [listSong, setListSong] = useState<IMusic[]>([])
    const [content, setContent] = useState<IContent>({page: 'ARTIST', title: '', subtitle: '', image: ''})

    useEffect(() => {
        // getSin
        getAllMusic().then((res) => {
            setListSong(res.element)
        })
    }, [])

    return (
        <>
            <Content data={data} content={content} />
        </>
    )
}

export default SingleArtist
