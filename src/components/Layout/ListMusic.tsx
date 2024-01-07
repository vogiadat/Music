import {MoreHorizontal, Send} from 'lucide-react'
import {IComment, IMusic} from '@/types/music'
import {currentSong} from '@/features/musicSlice'
import {errorValue} from '@/utils/constant'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {useToast} from '../ui/use-toast'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {ScrollArea} from '@/components/ui/scroll-area'
import {Input} from '@/components/ui/input'
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet'
import {getComment, sendComment} from '@/services/music.service'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {useState} from 'react'
import {formatName, formatTime} from '@/hooks/functions'

type Props = {
    listSong: IMusic[]
}

const ListMusic = ({listSong}: Props) => {
    const {toast} = useToast()
    const {music} = useAppSelector((state) => state.music)
    const {user} = useAppSelector((state) => state.auth)
    const [listComment, setListComment] = useState<IComment[]>()
    const [newComment, setNewComment] = useState({mediaId: '', message: ''})
    const dispatch = useAppDispatch()

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
        } catch (error) {
            console.error('Error downloading audio:', error)
        }
    }

    const handleComment = async (id: string) => {
        const res = await getComment(id)
        setListComment(res.rows)
        setNewComment({...newComment, mediaId: id})
    }

    const handleSendComment = async () => {
        const res = await sendComment(newComment)

        if (res.status === 200)
            return toast({
                variant: 'success',
                title: 'Success',
                description: `Post Success`,
            })
        toast({
            variant: 'destructive',
            title: 'Error',
            description: `Post Error`,
        })
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
                            <div className='col-span-3 flex items-center justify-center text-white text-opacity-60'>
                                {song.album?.name}
                            </div>
                            <div className='col-span-1 flex items-center justify-center text-xl'>
                                {formatTime(song.duration)}
                            </div>
                            <div className='col-span-1 flex items-center justify-center'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreHorizontal size={28} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={() => handleDownload(song)}
                                            className='cursor-pointer'
                                        >
                                            Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Sheet>
                                                <SheetTrigger
                                                    className='mt-1 text-sm py-1 pl-2 text-left w-full rounded-sm hover:bg-secondary hover:text-white'
                                                    onClick={() => handleComment(song.id)}
                                                >
                                                    Comment
                                                </SheetTrigger>
                                                <SheetContent className='text-white border-0'>
                                                    <SheetHeader>
                                                        <SheetTitle className='uppercase bg-zinc-800 text-white text-opacity-60 mx-auto text-center py-2 rounded-3xl w-5/6'>
                                                            Comments
                                                        </SheetTitle>
                                                    </SheetHeader>
                                                    <ScrollArea className='grid gap-4 py-4'>
                                                        {listComment &&
                                                            listComment.map((comment) => (
                                                                <div
                                                                    className='my-2 grid grid-cols-4 items-center gap-4 bg-zinc-700 rounded-xl px-4 py-2'
                                                                    key={comment.id}
                                                                >
                                                                    <Avatar>
                                                                        <AvatarImage
                                                                            src={comment.author.avatar || ''}
                                                                            alt=''
                                                                            onError={({currentTarget}) => {
                                                                                currentTarget.onerror = null // prevents looping
                                                                                currentTarget.src = errorValue.image
                                                                            }}
                                                                        />
                                                                        <AvatarFallback className='text-background text-center'>
                                                                            {formatName(
                                                                                comment.author.firstName,
                                                                                comment.author.lastName,
                                                                            )}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className='col-span-3 -ml-4'>
                                                                        <b>
                                                                            {formatName(
                                                                                comment.author.firstName,
                                                                                comment.author.lastName,
                                                                            )}
                                                                        </b>
                                                                        <p className='line-clamp-4 text-justify'>
                                                                            {comment.message}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </ScrollArea>
                                                    <SheetFooter>
                                                        <div className='grid w-full '>
                                                            <Input
                                                                id='yourComment'
                                                                value={newComment.message}
                                                                placeholder='Enter your comment'
                                                                className='bg-white text-black'
                                                                onChange={(e) =>
                                                                    setNewComment({
                                                                        ...newComment,
                                                                        message: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                        <button type='button' onClick={handleSendComment}>
                                                            <Send />
                                                        </button>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>
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
