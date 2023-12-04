import {useState, ReactNode, SetStateAction, RefObject, Dispatch} from 'react'
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
} from 'lucide-react'
import {IMusic} from '@/types/music'
import {errorValue} from '@/utils/constant'
import {Slider} from '../ui/slider'

type Props = {
    currentSong: IMusic
    setCurrentSong: Dispatch<SetStateAction<IMusic>>
    isPlay: ReactNode
    setIsPlay: Dispatch<SetStateAction<boolean>>
    initAudio: RefObject<HTMLAudioElement>
    progress: number
    setProgress: Dispatch<SetStateAction<number>>
}

const Player = ({currentSong, setCurrentSong, isPlay, setIsPlay, initAudio, progress, setProgress}: Props) => {
    const [volume, setVolume] = useState(100)
    console.log(currentSong)

    const handleChangeVolume = (value: number[]) => {
        const newVolume = value.at(0) || 0
        setVolume(newVolume)
        initAudio.current.volume = newVolume / 100
    }

    const handleChangeProgress = (value: number[]) => {
        return setProgress(value.at(0) || 0)
    }

    const handleMoveTime = (value: number[]) => {
        const time = value.at(0) || 0
        initAudio.current.currentTime = (initAudio.current?.duration / 100) * time
    }

    const toggleMusic = () => {
        setIsPlay(!isPlay)
    }

    return (
        <>
            <div className='bg-background fixed z-20 inset-x-0 bottom-0 grid grid-cols-12 items-center text-white h-32 max-h-32'>
                <div className='col-span-3 flex justify-evenly gap-2 items-center mx-5'>
                    <div className='h-28 w-28 rounded-lg overflow-hidden shadow shadow-gray-900'>
                        <img
                            src={currentSong?.image}
                            alt=''
                            className='object-cover'
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = errorValue.image
                            }}
                        />
                    </div>
                    <div className='text-center truncate'>
                        <b className='text-xl'>{currentSong?.name}</b>
                        <p className='text-md'>
                            {currentSong?.author?.firstName || '' + currentSong?.author?.lastName || ''}
                        </p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <button>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='fill-none stroke-current lucide lucide-heart'
                            >
                                <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
                            </svg>
                        </button>
                        <button className=''>
                            <svg
                                width='30'
                                height='30'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M4.5 14.25C3.90326 14.25 3.33097 14.0129 2.90901 13.591C2.48705 13.169 2.25 12.5967 2.25 12C2.25 11.4033 2.48705 10.831 2.90901 10.409C3.33097 9.98705 3.90326 9.75 4.5 9.75C5.09674 9.75 5.66903 9.98705 6.09099 10.409C6.51295 10.831 6.75 11.4033 6.75 12C6.75 12.5967 6.51295 13.169 6.09099 13.591C5.66903 14.0129 5.09674 14.25 4.5 14.25ZM12 14.25C11.4033 14.25 10.831 14.0129 10.409 13.591C9.98705 13.169 9.75 12.5967 9.75 12C9.75 11.4033 9.98705 10.831 10.409 10.409C10.831 9.98705 11.4033 9.75 12 9.75C12.5967 9.75 13.169 9.98705 13.591 10.409C14.0129 10.831 14.25 11.4033 14.25 12C14.25 12.5967 14.0129 13.169 13.591 13.591C13.169 14.0129 12.5967 14.25 12 14.25ZM19.5 14.25C18.9033 14.25 18.331 14.0129 17.909 13.591C17.4871 13.169 17.25 12.5967 17.25 12C17.25 11.4033 17.4871 10.831 17.909 10.409C18.331 9.98705 18.9033 9.75 19.5 9.75C20.0967 9.75 20.669 9.98705 21.091 10.409C21.5129 10.831 21.75 11.4033 21.75 12C21.75 12.5967 21.5129 13.169 21.091 13.591C20.669 14.0129 20.0967 14.25 19.5 14.25Z'
                                    className='fill-current'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='col-span-6'>
                    <div className='grid w-5/6 mx-auto'>
                        <div className='row'>
                            <ul className='flex w-2/5 mx-auto justify-around items-center'>
                                <li>
                                    <button>
                                        <Repeat2 />
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <SkipBack />
                                    </button>
                                </li>
                                <li className='w-20 h-20 flex items-center justify-center'>
                                    <button type='button' onClick={toggleMusic} className=''>
                                        {!isPlay ?
                                            <PlayCircle size={60} strokeWidth={1} />
                                        :   <PauseCircle size={60} strokeWidth={1} className='stroke-secondary' />}
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <SkipForward />
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <Shuffle />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='row mt-2'>
                            <Slider
                                value={[progress]}
                                min={0}
                                max={100}
                                step={Number(initAudio.current?.duration) / 100}
                                onValueChange={handleChangeProgress}
                                onValueCommit={handleMoveTime}
                            />
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
                            onValueChange={handleChangeVolume}
                            className='volume'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player
