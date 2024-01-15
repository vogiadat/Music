import {endPoint, errorValue} from '@/utils/constant'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {IPlaylist} from '@/types/playlist'
import {delPlaylist, detailPlayList, newPlaylist} from '@/features/playlistSlice'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {ListVideo, Loader2} from 'lucide-react'
import {useState} from 'react'
import {useToast} from '@/components/ui/use-toast'
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from '@/components/ui/context-menu'

type Props = {
    title: string
    list: IPlaylist[]
}

const List = ({title, list}: Props) => {
    const dispatch = useAppDispatch()
    const {music} = useAppSelector((state) => state.music)
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [playlistName, setPlaylistName] = useState<string>('')

    const handlePlaylist = async () => {
        setIsLoading(true)
        try {
            dispatch(newPlaylist(playlistName))
            setIsLoading(false)
            toast({
                variant: 'success',
                title: 'Success',
                description: `Create ${playlistName} success`,
            })
        } catch (error) {
            setIsLoading(false)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Error: Can't create ${playlistName}`,
            })
        }
    }

    const handleSingle = (item: IPlaylist) => {
        const value: IPlaylist = {
            ...item,
            image: item.playlistAndMusics.at(0)?.media.image,
        }
        dispatch(detailPlayList(value))
    }

    const handleDelete = (id: string) => {
        dispatch(delPlaylist(id))
    }

    return (
        <>
            <div className='ml-6 flex justify-between'>
                <b className='text-4xl font-extrabold'>{title}</b>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant='default'
                            className='bg-white text-background hover:bg-secondary hover:text-white'
                        >
                            Tạo Danh Sách
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] bg-white text-background'>
                        <DialogHeader>
                            <DialogTitle>Tạo Danh Sách</DialogTitle>
                            <DialogDescription>Tạo danh sách bài hát theo sở thích của chính bạn</DialogDescription>
                        </DialogHeader>
                        <div className='grid w-full max-w-sm items-center gap-2'>
                            <Label htmlFor='name'>Tên Danh Sách</Label>
                            <Input
                                id='name'
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                                className='bg-white text-background'
                            />
                        </div>

                        <DialogFooter>
                            {isLoading ?
                                <Button disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            :   <Button type='button' onClick={handlePlaylist}>
                                    Tạo
                                </Button>
                            }
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {list.length <= 0 ?
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <ListVideo size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>Let’s create new playlist</b>
                        <Link
                            to={endPoint.music}
                            className='mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                        >
                            Listen music
                        </Link>
                    </div>
                </div>
            :   <div className={`w-full ${music && 'max-h-[680px]'} h-[850px] overflow-y-scroll`}>
                    <div className='m-10 mx-20 max-2xl:mx-10 grid grid-cols-5 gap-14'>
                        {list.map((item) => (
                            <Link
                                to={endPoint.playlist.concat(`/${item.id}`)}
                                key={item.id}
                                onClick={() => handleSingle(item)}
                            >
                                <ContextMenu>
                                    <ContextMenuTrigger>
                                        <div className='bg-background rounded-xl h-80 max-2xl:h-60'>
                                            <div className='p-6 max-2xl:p-4 mx-auto'>
                                                <img
                                                    src={item.playlistAndMusics.at(0)?.media.image || ''}
                                                    className='rounded-xl h-52 max-2xl:h-40 w-full overflow-hidden object-cover'
                                                    onError={({currentTarget}) => {
                                                        currentTarget.onerror = null // prevents looping
                                                        currentTarget.src = errorValue.image
                                                    }}
                                                />
                                            </div>
                                            <div className='-mt-2 max-2xl:-mt-3 text-center w-full pl-3 truncate'>
                                                <b className='text-xl max-2xl:text-sm max-2xl:px-1'>
                                                    {item.name || ''}
                                                </b>
                                                <p className='opacity-40 max-2xl:text-xs:'>{`${item.playlistAndMusics.length} Bài hát`}</p>
                                            </div>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleDelete(item.id)
                                            }}
                                        >
                                            Delete
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default List
