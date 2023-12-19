import {IMusic} from '@/types/music'
import {Heart, MoreHorizontal, Music2, PlayCircle, Search} from 'lucide-react'
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import TableMusic from './TableMusic'
import {IContent} from '@/types/content'
import {endPoint, errorValue} from '@/utils/constant'
import {Link} from 'react-router-dom'
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar'

interface Music {
    index: number
    song: IMusic
}

type Props = {
    data: Music[]
    content: IContent
}

const Content = ({data, content}: Props) => {
    return (
        <>
            <div
                className={`w-full h-[850px] overflow-y-scroll ${
                    content.page === 'PLAYLISTS' ? 'bg-gradient-to-b from-background ' : 'bg-transparent'
                } rounded-t-xl`}
            >
                <div className='p-6 grid grid-cols-4 gap-10'>
                    <div className='col-span-1'>
                        <img
                            src={content.image || ''}
                            alt={content.title}
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = errorValue.image
                            }}
                            className='rounded-xl overflow-hidden object-cover'
                        />
                    </div>
                    <div className='col-span-3 flex items-end'>
                        <div className=''>
                            <p className='mb-2 text-xl font-medium'>{content.page}</p>
                            <b className='text-4xl font-extrabold'>{content.title}</b>
                            <p className='mt-4 opacity-50'>
                                {content.avatar && (
                                    <Avatar>
                                        <AvatarImage
                                            src={content.avatar}
                                            onError={({currentTarget}) => {
                                                currentTarget.onerror = null // prevents looping
                                                currentTarget.src = errorValue.image
                                            }}
                                        />
                                        <AvatarFallback className='text-background text-center'>
                                            {content.subtitle}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                {content.subtitle}
                            </p>
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
                            <div>
                                {/* <Select>
                                    <SelectTrigger className='w-[180px] border-none'>
                                        <SelectValue placeholder='Custom order' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='title'>Title</SelectItem>
                                        <SelectItem value='artist'>Artist</SelectItem>
                                    </SelectContent>
                                </Select> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    {data ?
                        <TableMusic data={data} />
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

export default Content
