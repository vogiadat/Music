import {IAlbum} from '@/types/music'
import {Heart, MoreHorizontal, PlayCircle, Search} from 'lucide-react'
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import TableMusic from './TableMusic'
import {IContent} from '@/types/content'
import {errorValue} from '@/utils/constant'

type Props = {
    data?: IAlbum
    content: IContent
}

const Music = ({data, content}: Props) => {
    return (
        <>
            <div className='w-full h-[850px] overflow-y-scroll bg-gradient-to-b from-background rounded-t-xl'>
                <div className='p-6 grid grid-cols-4 gap-10'>
                    <div className='col-span-1'>
                        <img
                            src={content.image}
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
                            <p className='mt-4 opacity-50'>{content.subtitle}</p>
                        </div>
                    </div>
                    <div className='col-span-full flex justify-between'>
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
                    <TableMusic />
                </div>
            </div>
        </>
    )
}

export default Music
