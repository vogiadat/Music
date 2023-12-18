import {useAppDispatch} from '@/app/hook'
import {setListSong} from '@/features/musicSlice'
import {getAllAlbums} from '@/services/music.service'
import {IAlbum} from '@/types/music'
import {endPoint, errorValue} from '@/utils/constant'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Albums = () => {
    const dispatch = useAppDispatch()
    const [listAlbum, setListAlbum] = useState<IAlbum[]>([])
    useEffect(() => {
        getAllAlbums().then((res) => setListAlbum(res.element))
    }, [])

    const handleAlbum = (album: IAlbum) => {
        dispatch(setListSong(album))
    }

    return (
        <>
            <div>
                <div className='ml-6'>
                    <b className='text-4xl font-extrabold'>Artist</b>
                </div>
                <div className={`w-full h-[850px] overflow-y-scroll`}>
                    <div className='m-10 mx-20 max-2xl:mx-10 grid grid-cols-5 gap-14'>
                        {listAlbum &&
                            listAlbum.map((album) => (
                                <Link
                                    to={endPoint.albums.concat(`/${album.id}`)}
                                    key={album.id}
                                    onClick={() => handleAlbum(album)}
                                >
                                    <div className='bg-background rounded-xl h-80 max-2xl:h-60'>
                                        <div className='p-6 max-2xl:p-4 mx-auto'>
                                            <img
                                                src={album.image}
                                                className='rounded-xl h-52 max-2xl:h-40 overflow-hidden object-cover'
                                                onError={({currentTarget}) => {
                                                    currentTarget.onerror = null // prevents looping
                                                    currentTarget.src = errorValue.image
                                                }}
                                            />
                                        </div>
                                        <div className='-mt-2 max-2xl:-mt-3 text-center'>
                                            <b className='text-xl max-2xl:text-sm max-2xl:px-1'>{album.name}</b>
                                            <p className='opacity-40 max-2xl:text-xs:'>{album.medias?.length} songs</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Albums
