// import {formatTime} from '@/hooks/functions'
import {MoreHorizontal} from 'lucide-react'
import {IMusic} from '../../types/music'
import {useDispatch} from 'react-redux'
import {setMusic} from '@/features/demo/musicSlice'
import {errorValue} from '@/utils/constant'

type Props = {
    listSong: IMusic[]
}

const ListMusic = ({listSong}: Props) => {
    const dispatch = useDispatch()

    const handlePlayMusic = async (song: IMusic) => {
        dispatch(setMusic(song))
    }

    return (
        <>
            <div>
                <ul className='overflow-scroll'>
                    {listSong.map((song: IMusic, index: number) => {
                        return (
                            <li
                                key={song.name}
                                className='grid grid-cols-12 p-5 rounded-2xl my-5 hover:cursor-pointer bg-neutral-800 bg-opacity-40 hover:bg-secondary hover:bg-opacity-80 transition-colors duration-150 ease-in-out'
                                onClick={() => handlePlayMusic(song)}
                            >
                                <div className='col-span-1 flex items-center text-2xl font-semibold'>{index + 1}</div>
                                <div className='col-span-6 flex gap-6'>
                                    <div className='w-32 h-32 rounded-lg overflow-hidden'>
                                        <img
                                            src={song.image}
                                            className='object-cover'
                                            onError={({currentTarget}) => {
                                                currentTarget.onerror = null // prevents looping
                                                currentTarget.src = errorValue.image
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <b className='text-3xl truncate capitalize'>{song.name}</b>
                                        <p className='opacity-60 text-lg'>
                                            {song.author?.firstName || '' + song.author?.lastName || ''}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-span-4'>{song.album?.name}</div>
                                <div className='col-span-1 flex items-center'>
                                    <MoreHorizontal size={40} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default ListMusic
