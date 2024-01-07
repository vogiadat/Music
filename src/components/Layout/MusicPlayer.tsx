import {useAppDispatch, useAppSelector} from '@/app/hook'
import Player from '@/components/Layout/Controls'
import {useEffect, useRef, useState} from 'react'
import {IComment, IMusic} from '@/types/music'
import {setCurrentSong} from '@/features/musicSlice'
import {useToast} from '../ui/use-toast'
import {addFavor, delFavor} from '@/features/favorSlice'
import {getComment, sendComment} from '@/services/music.service'

const MusicPlayer = () => {
    const {toast} = useToast()
    const {user} = useAppSelector((state) => state.auth)
    const {listFavor} = useAppSelector((state) => state.favor)
    const {music, listMusic} = useAppSelector((state) => state.music)
    const [listComment, setListComment] = useState<IComment[]>()
    const [newComment, setNewComment] = useState({mediaId: '', message: ''})
    const dispatch = useAppDispatch()

    // ref
    const audio = useRef<HTMLAudioElement>(null)

    // handle music
    const [initMusic, setInitMusic] = useState<IMusic | null>(music)
    const [isPlay, setIsPlay] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
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
        console.log(isFavor)
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

            // navigate(endPoint.download.concat(`/${song.id}`))
        } catch (error) {
            console.error('Error downloading audio:', error)
        }
    }

    const handleComment = async (id: string) => {
        const res = await getComment(id)
        setListComment(res.rows)
        setNewComment({...newComment, mediaId: id})
    }

    const changeComment = (comment: string) => {
        setNewComment({
            ...newComment,
            message: comment,
        })
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

    useEffect(() => {
        if (music) setInitMusic(music)
        if (!audio.current) return
        if (audio.current.volume !== volume) audio.current.volume = volume / 100
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
    }, [toast, isPlay, user, volume, currentTime, music, initMusic])

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
                        duration={audio.current?.duration || 0}
                        volume={volume}
                        handleVolume={handleVolume}
                        handleProgress={handleProgress}
                        handleLoop={handleLoop}
                        handleShuffle={handleShuffle}
                        handleFavor={handleFavor}
                        handleDownload={handleDownload}
                        initComment={newComment.message}
                        listComment={listComment || []}
                        handleComment={handleComment}
                        changeComment={changeComment}
                        handleSendComment={handleSendComment}
                    />
                </>
            )}
        </>
    )
}

export default MusicPlayer
