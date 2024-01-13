import {ArrowDownToLine, Loader2, MoreHorizontal} from 'lucide-react'
import {IMusic} from '@/types/music'
import {currentSong} from '@/features/musicSlice'
import {errorValue} from '@/utils/constant'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {useToast} from '@/components/ui/use-toast'
import {ScrollArea} from '@/components/ui/scroll-area'
import {formatTime} from '@/hooks/functions'
import {addDownload} from '@/services/download.service'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {useState} from 'react'
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card'
import {IAddPlaylist} from '@/types/playlist'
import {addToPlaylist} from '@/features/playlistSlice'

type Props = {
    listSong: IMusic[]
}

const ListMusic = ({listSong}: Props) => {
    const dispatch = useAppDispatch()
    const {toast} = useToast()
    const {music} = useAppSelector((state) => state.music)
    const {user} = useAppSelector((state) => state.auth)
    const {myList} = useAppSelector((state) => state.playlist)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<IAddPlaylist>({mediaId: '', playListId: ''})

    const handlePlayMusic = async (song: IMusic) => {
        if (!user && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need login to action',
            })
        if (!user?.isPremium && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need buy premium to action',
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
            return await addDownload(song.id)
        } catch (error) {
            console.error('Error downloading audio:', error)
        }
    }

    const handleAddPlaylist = async () => {
        setIsLoading(true)
        try {
            await dispatch(addToPlaylist(data))
            setIsLoading(false)
            toast({
                variant: 'success',
                title: 'Success',
                description: `Add song to playlist success`,
            })
        } catch (error) {
            setIsLoading(false)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Can't add to playlist`,
            })
        }
    }

    return (
        <ul className={`${music ? 'h-4/6' : 'h-5/6'}  mt-4 fixed w-4/5`}>
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
                            <div className='col-span-1 flex items-center justify-center gap-4'>
                                <ArrowDownToLine onClick={() => handleDownload(song)} />
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <MoreHorizontal />
                                    </HoverCardTrigger>
                                    <HoverCardContent align='end' className='max-w-fit border-none'>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant='default'
                                                    className='bg-white text-background hover:bg-secondary hover:text-white'
                                                    onClick={() => setData({...data, mediaId: song.id})}
                                                >
                                                    Thêm vào danh sách
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className='sm:max-w-[425px] bg-white text-background'>
                                                <DialogHeader>
                                                    <DialogTitle>Danh Sách</DialogTitle>
                                                    <DialogDescription>
                                                        Thêm vào sách bài hát theo sở thích của chính bạn
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className='grid w-full max-w-sm items-center gap-2'>
                                                    <Label htmlFor='name'>Tên Danh Sách</Label>
                                                    <Select
                                                        onValueChange={(playListId) => setData({...data, playListId})}
                                                    >
                                                        <SelectTrigger className='w-full bg-white'>
                                                            <SelectValue placeholder='Chọn danh sách phát' />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Danh Sách</SelectLabel>
                                                                {myList.map((item) => {
                                                                    return (
                                                                        <SelectItem key={item.id} value={item.id}>
                                                                            {item.name}
                                                                        </SelectItem>
                                                                    )
                                                                })}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <DialogFooter>
                                                    {isLoading ?
                                                        <Button disabled>
                                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                            Please wait
                                                        </Button>
                                                    :   <Button type='button' onClick={handleAddPlaylist}>
                                                            Tạo
                                                        </Button>
                                                    }
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </li>
                    )
                })}
            </ScrollArea>
        </ul>
    )
}

export default ListMusic
