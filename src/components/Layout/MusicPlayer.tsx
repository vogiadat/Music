import {useAppDispatch, useAppSelector} from '@/app/hook'
import Player from '@/components/Layout/Controls'
import {useEffect, useRef, useState} from 'react'
import {IMusic} from '@/types/music'
import {setCurrentSong} from '@/features/musicSlice'
import {useToast} from '../ui/use-toast'
import {addFavor, delFavor} from '@/features/favorSlice'

const MusicPlayer = () => {
    const {toast} = useToast()
    const {user} = useAppSelector((state) => state.auth)
    const {listFavor} = useAppSelector((state) => state.favor)
    const {music, listMusic} = useAppSelector((state) => state.music)
    const dispatch = useAppDispatch()

    // ref
    const audio = useRef<HTMLAudioElement>(null)

    // handle music
    const [initMusic, setInitMusic] = useState<IMusic | null>(music)
    const [isPlay, setIsPlay] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(100)
    const [isLoop, setIsLoop] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)

    const toggleMusic = () => {
        setIsPlay(!isPlay)
    }

    const handleTime = () => {
        if (audio.current) {
            setCurrentTime((audio.current.currentTime / audio.current.duration) * 100)
        }
    }

    const handleFavor = () => {
        const song = initMusic || music
        if (!song) return
        const isFavor = listFavor?.find((music) => music.mediaId === song.id)
        if (!isFavor) return dispatch(addFavor(song.id))
        dispatch(delFavor(isFavor.id))
    }

    const handleNextSong = () => {
        if (listMusic && music) {
            const indexSong = listMusic.findIndex((song) => song.id === music.id)
            let newSong
            if (isShuffle) {
                do {
                    newSong = Math.floor(Math.random() * listMusic.length)
                } while (newSong === indexSong)
            } else {
                newSong = indexSong + 1 >= listMusic.length ? 0 : indexSong + 1
            }
            setInitMusic(listMusic.at(newSong) || null)
            dispatch(setCurrentSong(listMusic.at(newSong)))
        }
    }

    const handlePrevSong = () => {
        if (listMusic && music) {
            const indexSong = listMusic.findIndex((song) => song.id === music.id)
            let newSong
            if (isShuffle) {
                do {
                    newSong = Math.floor(Math.random() * listMusic.length)
                } while (newSong === indexSong)
            } else {
                newSong = indexSong == 0 ? listMusic.length - 1 : indexSong - 1
            }
            setInitMusic(listMusic.at(newSong) || null)
            dispatch(setCurrentSong(listMusic.at(newSong)))
        }
    }

    const handleProgress = (value: number[]) => {
        const newValue = value.at(0) || 0

        if (audio.current) {
            audio.current.currentTime = (newValue * audio.current.duration) / 100
        }
    }

    const handleVolume = async (value: number[]) => {
        const newVolume = value.at(0) || 0
        setVolume(newVolume)
    }

    const handleLoop = () => {
        setIsLoop(!isLoop)
    }

    const handleShuffle = () => {
        setIsShuffle(!isShuffle)
    }

    const handleEnded = () => {
        if (!isLoop) {
            handleNextSong()
        }
    }

    useEffect(() => {
        if (!audio.current) return
        if (!isPlay) return audio.current.pause()
        const isPremium = initMusic?.isPremium || music?.isPremium
        if (!isPremium) return void audio.current.play()
        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need login to listen this music',
            })
            setIsPlay(false)
            return audio.current.pause()
        }
        if (!user?.isPremium) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need buy premium to listen this music',
            })
            setIsPlay(false)
            return audio.current.pause()
        }
        audio.current.play()
        audio.current.volume = volume / 100
        setDuration(audio.current.duration)
    }, [isPlay, user, volume, currentTime, music, initMusic])

    return (
        <>
            {music && (
                <>
                    <audio
                        ref={audio}
                        src={initMusic?.src || music.src}
                        onTimeUpdate={handleTime}
                        onEnded={handleEnded}
                    />
                    <Player
                        song={initMusic || music}
                        currentTime={currentTime}
                        isPlay={isPlay}
                        isLoop={isLoop}
                        isShuffle={isShuffle}
                        toggleMusic={toggleMusic}
                        handleNext={handleNextSong}
                        handlePrev={handlePrevSong}
                        duration={duration}
                        volume={volume}
                        handleVolume={handleVolume}
                        handleProgress={handleProgress}
                        handleLoop={handleLoop}
                        handleShuffle={handleShuffle}
                        handleFavor={handleFavor}
                    />
                </>
            )}
        </>
    )
}

export default MusicPlayer
