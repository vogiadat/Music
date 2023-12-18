import {formatName} from '@/hooks/functions'
import {getAllArtist} from '@/services/user.service'
import {IUser} from '@/types/user'
import {endPoint, errorValue} from '@/utils/constant'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Artist = () => {
    const [listArtist, setListArtist] = useState<IUser[]>([])

    useEffect(() => {
        getAllArtist().then((res) => {
            setListArtist(res.element)
        })
    }, [])

    return (
        <>
            <div>
                <div className='ml-6'>
                    <b className='text-4xl font-extrabold'>Artist</b>
                </div>
                <div className={`w-full h-[850px] overflow-y-scroll`}>
                    <div className='m-10 mx-20 max-2xl:mx-10 grid grid-cols-5 gap-14'>
                        {listArtist.map((artist) => {
                            return (
                                <Link to={endPoint.artist.concat(`/${artist.id}`)} key={artist.id}>
                                    <div className='bg-background rounded-xl h-80 max-2xl:h-60'>
                                        <div className='p-6 max-2xl:p-4 mx-auto'>
                                            <img
                                                src={artist.avatar || ''}
                                                className='rounded-xl h-52 max-2xl:h-40 overflow-hidden object-cover'
                                                onError={({currentTarget}) => {
                                                    currentTarget.onerror = null
                                                    currentTarget.src = errorValue.image
                                                }}
                                            />
                                        </div>
                                        <div className='-mt-2 max-2xl:mt-1 text-center'>
                                            <b className='text-xl'>{formatName(artist.firstName, artist.lastName)}</b>
                                            {/* <p className='opacity-40'>{formatListened(artist?.listen || 0)} Plays</p> */}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Artist
