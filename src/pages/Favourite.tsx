import Music from '@/components/Layout/Music'
import {IContent} from '@/types/content'
import React from 'react'

const content: IContent = {
    page: 'PLAYLIST',
    title: 'Liked Songs',
    subtitle: '',
    image: '',
}

const Favourite = () => {
    return (
        <>
            <Music content={content} />
        </>
    )
}

export default Favourite
