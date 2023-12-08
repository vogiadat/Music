import {useState, useRef} from 'react'
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
} from 'lucide-react'
import {IMusic} from '@/types/music'
import {errorValue} from '@/utils/constant'
import {Slider} from '../ui/slider'
// import {useAppSelector} from '@/app/hook'

type Props = {
    music: IMusic
    listMusic: IMusic[]
}

const Player = ({music, listMusic}: Props) => {
    const [initMusic, setInitMusic] = useState(music)
    const [isPlay, setIsPlay] = useState(false)
    const [volume, setVolume] = useState(100)
    const [progress, setProgress] = useState(0)
    const audioRef = useRef<HTMLAudioElement>()

    const handleChangeProgress = (value: number[]) => {
        return setProgress(value.at(0) || 0)
    }

    const handleTime = () => {
        const duration = audioRef.current?.duration || 1
        const currentTime = audioRef.current?.currentTime || 1
        setProgress((currentTime / duration) * 100)
    }

    const handleSetVolume = (value: number[]) => {
        const newVolume = value.at(0) || 0
        setVolume(newVolume)
        audioRef.current.volume = newVolume / 100
    }

    const handleMoveTime = (value: number[]) => {
        const time = value.at(0) || 0
        audioRef.current.currentTime = (audioRef?.current?.duration / 100) * time
    }

    const handleSkip = () => {
        const indexSong = listMusic.findIndex((song) => song.id == initMusic.id)
        const newSong = indexSong + 1 >= listMusic.length ? 0 : indexSong + 1
        setInitMusic(listMusic.at(newSong))
    }

    const toggleMusic = () => {
        setIsPlay(!isPlay)
        !isPlay ? audioRef.current?.play() : audioRef.current?.pause()
    }

    return (
        <>
            <audio ref={audioRef} src={initMusic?.src} onTimeUpdate={handleTime}></audio>
            <div className='bg-background fixed z-20 inset-x-0 bottom-0 grid grid-cols-12 items-center text-white h-32 max-h-32'>
                <div className='col-span-3 flex justify-evenly gap-2 items-center mx-5'>
                    <div className='h-28 w-28 rounded-lg overflow-hidden shadow shadow-gray-900'>
                        <img
                            src={initMusic?.image}
                            alt=''
                            className='object-cover'
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = errorValue.image
                            }}
                        />
                    </div>
                    <div className='text-center truncate'>
                        <b className='text-xl'>{initMusic?.name}</b>
                        <p className='text-md'>
                            {initMusic?.author?.firstName || '' + initMusic?.author?.lastName || ''}
                        </p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <button>
                            <Heart />
                        </button>
                        <button>
                            <MoreHorizontal />
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
                                    <button onClick={handleSkip}>
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
                                step={Number(audioRef.current?.duration) / 100}
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
                            onValueChange={handleSetVolume}
                            className='volume'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player
