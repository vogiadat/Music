import {MoreHorizontal} from 'lucide-react'
import {IMusic} from '../../types/music'
import {currentSong} from '@/features/musicSlice'
import {endPoint, errorValue} from '@/utils/constant'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {useToast} from '../ui/use-toast'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {useNavigate} from 'react-router-dom'
import {ScrollArea} from '@/components/ui/scroll-area'

type Props = {
    listSong: IMusic[]
}

const ListMusic = ({listSong}: Props) => {
    const {toast} = useToast()
    const {music} = useAppSelector((state) => state.music)
    const {user} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handlePlayMusic = async (song: IMusic) => {
        if (!user && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need login to listen this music',
            })
        if (!user?.isPremium && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need buy premium to listen this music',
            })
        dispatch(currentSong({song, listSong}))
    }

    const handleDownload = async (song: IMusic) => {
        const audioUrl = song.src
        if (!user && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need login to download this music',
            })
        if (!user?.isPremium && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need buy premium to download this music',
            })

        try {
            const response = await fetch(audioUrl)
            const blob = await response.blob()

            const blobUrl = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = blobUrl
            link.download = song.name.concat('.mp3')
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)

            URL.revokeObjectURL(blobUrl)

            navigate(endPoint.download.concat(`/${song.id}`))
        } catch (error) {
            console.error('Error downloading audio:', error)
        }
    }

    return (
        <ul className={`${music ? 'h-4/6' : 'h-5/6'} mt-4 fixed w-4/5`}>
            <ScrollArea className='h-full'>
                {listSong.map((song: IMusic, index: number) => {
                    return (
                        <li
                            key={song.id}
                            className='grid grid-cols-12 p-2 rounded-2xl my-4 hover:cursor-pointer bg-neutral-800 bg-opacity-40 hover:bg-secondary hover:bg-opacity-80 transition-colors duration-150 ease-in-out'
                            onClick={() => handlePlayMusic(song)}
                        >
                            <div className='col-span-1 flex items-center text-xl px-2 font-semibold'>{index + 1}</div>
                            <div className='col-span-6 flex gap-6'>
                                <div className='w-28 h-28 rounded-lg overflow-hidden'>
                                    <img
                                        src={song.image}
                                        className='w-full h-full object-cover'
                                        onError={({currentTarget}) => {
                                            currentTarget.onerror = null // prevents looping
                                            currentTarget.src = errorValue.image
                                        }}
                                    />
                                </div>
                                <div>
                                    <b className='text-xl truncate capitalize'>{song.name}</b>
                                    {song.author && (
                                        <p className='opacity-60 text-base'>
                                            {song.author?.firstName || '' + song.author?.lastName || ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='col-span-4'>{song.album?.name}</div>
                            <div className='col-span-1 flex items-center'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreHorizontal size={28} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleDownload(song)}>
                                            Download
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </li>
                    )
                })}
            </ScrollArea>
        </ul>
    )
}

export default ListMusic
