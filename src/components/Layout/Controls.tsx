import {MouseEventHandler} from 'react'
import {
    Volume,
    Volume1,
    Volume2,
    VolumeX,
    SkipForward,
    SkipBack,
    Repeat2,
    Shuffle,
    PlayCircle,
    PauseCircle,
    Heart,
    MoreHorizontal,
    Send,
} from 'lucide-react'
import {Slider} from '../ui/slider'
import {errorValue} from '@/utils/constant'
import {IComment, IMusic} from '@/types/music'
import {formatName, formatTime} from '@/hooks/functions'
import {useAppSelector} from '@/app/hook'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '../ui/dropdown-menu'
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from '../ui/sheet'
import {ScrollArea} from '../ui/scroll-area'
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar'
import {Input} from '../ui/input'

type TSlider = (value: number[]) => void

type Props = {
    song: IMusic
    toggleMusic: MouseEventHandler
    isPlay: boolean
    isLoop: boolean
    isShuffle: boolean
    currentTime: number
    duration: number
    volume: number
    handleNext: MouseEventHandler
    handlePrev: MouseEventHandler
    handleVolume: TSlider
    handleProgress: TSlider
    handleLoop: MouseEventHandler
    handleShuffle: MouseEventHandler
    handleFavor: MouseEventHandler
    handleDownload: (song: IMusic) => void
    // comment
    initComment: string
    listComment: IComment[]
    changeComment: (comment: string) => void
    handleComment: (id: string) => void
    handleSendComment: MouseEventHandler
}

const Player = ({
    song,
    isPlay,
    isLoop,
    isShuffle,
    volume,
    duration,
    currentTime,
    toggleMusic,
    handleNext,
    handlePrev,
    handleVolume,
    handleProgress,
    handleLoop,
    handleShuffle,
    handleFavor,
    handleDownload,
    initComment,
    listComment,
    changeComment,
    handleComment,
    handleSendComment,
}: Props) => {
    const {listFavor} = useAppSelector((state) => state.favor)

    const IsFavor = () => {
        const isFavor = listFavor?.find((music) => music.media.id === song.id)
        return isFavor ? <Heart className='text-secondary fill-current' /> : <Heart />
    }

    return (
        <>
            <div className='bg-background fixed z-20 inset-x-0 bottom-0 grid grid-cols-12 items-center text-white h-36 max-h-36 max-2xl:h-20'>
                <div className='col-span-3 flex justify-evenly gap-2 items-center max-2xl:mb-3 mx-5'>
                    <div className='h-28 w-28 max-2xl:w-14 max-2xl:h-14 rounded-lg overflow-hidden shadow shadow-gray-900'>
                        <img
                            src={song.image}
                            alt=''
                            className='object-cover w-full h-full'
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = errorValue.image
                            }}
                        />
                    </div>
                    <div className='text-center truncate w-44'>
                        <b className='text-xl'>{song.name}</b>
                        <p className='text-md'>
                            {formatName(song.author?.firstName || '', song.author?.lastName || '')}
                        </p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <button onClick={handleFavor}>
                            <IsFavor />
                        </button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreHorizontal />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side='top' align='start'>
                                <DropdownMenuItem onClick={() => handleDownload(song)}>Download</DropdownMenuItem>
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
                                                        value={initComment}
                                                        placeholder='Enter your comment'
                                                        className='bg-white text-black'
                                                        onChange={(e) => changeComment(e.target.value)}
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
                </div>
                <div className='col-span-6'>
                    <div className='grid w-5/6 mx-auto'>
                        <div className='row'>
                            <ul className='flex w-2/5 mx-auto justify-around items-center max-2xl:h-14'>
                                <li>
                                    <button
                                        className={`${isLoop ? 'text-secondary' : 'text-white'}`}
                                        onClick={handleLoop}
                                    >
                                        <Repeat2 className='hover:text-secondary max-2xl:h-5 max-2xl:w-5' />
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handlePrev}>
                                        <SkipBack className='hover:text-secondary max-2xl:h-5 max-2xl:w-5' />
                                    </button>
                                </li>
                                <li className='w-20 h-20 flex items-center justify-center'>
                                    <button type='button' onClick={toggleMusic}>
                                        {!isPlay ?
                                            <PlayCircle
                                                className='max-2xl:h-10 max-2xl:w-10'
                                                size={60}
                                                strokeWidth={1}
                                            />
                                        :   <PauseCircle
                                                size={60}
                                                strokeWidth={1}
                                                className='stroke-secondary max-2xl:h-10 max-2xl:w-10'
                                            />
                                        }
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleNext}>
                                        <SkipForward className='hover:text-secondary max-2xl:h-5 max-2xl:w-5' />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={isShuffle ? 'text-secondary' : 'text-white'}
                                        onClick={handleShuffle}
                                    >
                                        <Shuffle className='hover:text-secondary max-2xl:h-5 max-2xl:w-5' />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='row w-full mt-2 max-2xl:mt-0'>
                            <div className='w-full -mt-8 py-2 flex justify-between text-sm'>
                                <span>00:00</span>
                                <span>{duration ? formatTime(duration) : '--:--'}</span>
                            </div>
                            <Slider value={[currentTime]} min={0} max={100} step={1} onValueChange={handleProgress} />
                        </div>
                    </div>
                </div>
                <div className='col-span-3 flex justify-center'>
                    <div className='w-7/12 flex'>
                        <div className='mr-5'>
                            {volume == 0 ?
                                <VolumeX />
                            : volume < 20 ?
                                <Volume />
                            : volume < 60 ?
                                <Volume1 />
                            :   <Volume2 />}
                        </div>
                        <Slider
                            value={[volume]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={handleVolume}
                            className='volume'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player
