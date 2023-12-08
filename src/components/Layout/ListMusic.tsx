import {MoreHorizontal} from 'lucide-react'
import {IMusic} from '../../types/music'
import {useDispatch} from 'react-redux'
import {setMusic} from '@/features/musicSlice'
import {errorValue} from '@/utils/constant'
import {useAppSelector} from '@/app/hook'

type Props = {
    listSong: IMusic[]
}

const ListMusic = ({listSong}: Props) => {
    const dispatch = useDispatch()
    const {music} = useAppSelector((state) => state.music)

    const handlePlayMusic = async (song: IMusic) => {
        dispatch(setMusic({song, listSong}))
    }

    return (
        <>
            <div>
                <ul className={`my-10 ${music ? 'mb-40' : ''}`}>
                    {listSong.map((song: IMusic, index: number) => {
                        return (
                            <li
                                key={song.name}
                                className='grid grid-cols-12 p-2 rounded-2xl my-4 hover:cursor-pointer bg-neutral-800 bg-opacity-40 hover:bg-secondary hover:bg-opacity-80 transition-colors duration-150 ease-in-out'
                                onClick={() => handlePlayMusic(song)}
                            >
                                <div className='col-span-1 flex items-center text-xl px-2 font-semibold'>
                                    {index + 1}
                                </div>
                                <div className='col-span-6 flex gap-6'>
                                    <div className='w-28 h-28 rounded-lg overflow-hidden'>
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
                                        <b className='text-xl truncate capitalize'>{song.name}</b>
                                        <p className='opacity-60 text-base'>
                                            {song.author?.firstName || '' + song.author?.lastName || ''}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-span-4'>{song.album?.name}</div>
                                <div className='col-span-1 flex items-center'>
                                    <MoreHorizontal size={28} />
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
