import {useEffect, useState} from 'react'
import {IMusic} from '@/types/music'
import {IContent} from '@/types/content'
import {useAppSelector} from '@/app/hook'
import {endPoint, errorValue} from '@/utils/constant'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Heart, MoreHorizontal, Music2, PlayCircle, Search} from 'lucide-react'
import Table from './Table'
import {Link} from 'react-router-dom'

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
            <div
                className={`w-full h-[850px] overflow-y-scroll ${
                    content.page === 'PLAYLISTS' ? 'bg-gradient-to-b from-background ' : 'bg-transparent'
                } rounded-t-xl`}
            >
                <div className='p-6 flex gap-10'>
                    <div className='w-60 h-60 overflow-hidden rounded-xl'>
                        <img
                            src={content.image}
                            alt={content.title}
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = errorValue.image
                            }}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='flex items-end'>
                        <div className=''>
                            <p className='mb-2 text-xl font-medium'>{content.page}</p>
                            <b className='text-4xl font-extrabold'>{content.title}</b>
                            {content.subtitle && (
                                <p className='mt-4 opacity-50 flex items-center gap-4'>
                                    <Avatar>
                                        <AvatarImage src={content.avatar} alt='' />
                                        <AvatarFallback className='text-background text-center'>
                                            {content.subtitle}
                                        </AvatarFallback>
                                    </Avatar>
                                    {content.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${content.page === 'PLAYLISTS' ? '' : 'hidden'} col-span-full flex justify-between`}
                    >
                        <div className='flex items-center gap-20'>
                            <div>
                                <PlayCircle size={70} strokeWidth={1} />
                            </div>

                            <div className='flex justify-evenly gap-4'>
                                <div>
                                    <Heart size={40} />
                                </div>
                                <div>
                                    <MoreHorizontal size={40} />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div>
                                <Search />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    {data ?
                        <Table data={data} />
                    :   <div className='h-[420px] bg-gradient-to-b from-background grid text-center mt-5 border border-background '>
                            <Music2 size={80} className='mx-auto mt-16 ' />
                            <b className='text-4xl font-bold'>Songs you like will appear here</b>
                            <p className='text-xl'>Songs you like will appear here</p>
                            <Link
                                to={endPoint.music}
                                className='h-10 mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                            >
                                Find Song
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SingleAlbum
