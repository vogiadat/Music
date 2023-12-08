import React from 'react'
import Music from '../Layout/Music'
import {IAlbum} from '@/types/music'
import {IContent} from '@/types/content'

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

const content: IContent = {
    page: 'Music',
    title: data.authorId,
    subtitle: data.desc,
    image: data.image,
}

const SingleArtist = () => {
    return (
        <>
            <Music data={data} content={content} />
        </>
    )
}

export default SingleArtist
