import {formatListened} from '@/hooks/functions'
import {endPoint, errorValue} from '@/utils/constant'
import {Link} from 'react-router-dom'

const listTopArtist = [
    {
        id: 1,
        name: 'HIEUTHUHAI',
        isArtist: true,
        avatar: 'https://i.scdn.co/image/ab67616d0000b2738a063486be97d863207e1ca4',
        listen: 100000000,
    },
    {
        id: 2,
        name: 'Pop Smoke',
        isArtist: true,
        avatar: 'https://github.com/shadcn.png',
        listen: 840000,
    },
    {
        id: 3,
        name: 'giadat',
        isArtist: true,
        avatar: 'https://github.com/shadcn.png',
        listen: 1200,
    },
    {
        id: 4,
        name: 'Tester',
        isArtist: true,
        avatar: 'https://github.com/shadcn.png',
        listen: 5820000000,
    },
    {
        id: 5,
        name: 'toan',
        isArtist: true,
        avatar: 'https://github.com/shadcn.png',
        listen: 3210000,
    },
    {
        id: 6,
        name: 'tester',
        isArtist: true,
        avatar: 'https://github.com/shadcn.png',
        listen: 3210000,
    },
]

const Artist = () => {
    return (
        <>
            <div>
                <div className='ml-6'>
                    <b className='text-4xl font-extrabold'>Artist</b>
                </div>
                <div className={`w-full h-[850px] overflow-y-scroll`}>
                    <div className='m-10 mx-20 grid grid-cols-5 gap-14'>
                        {listTopArtist.map((artist) => (
                            <Link to={endPoint.artist.concat(`/${artist.id}`)} key={artist.id}>
                                <div className='bg-background rounded-xl h-80'>
                                    <div className='p-6 mx-auto'>
                                        <img
                                            src={artist.avatar}
                                            alt={artist.name}
                                            className='rounded-xl h-52 overflow-hidden object-cover'
                                            onError={({currentTarget}) => {
                                                currentTarget.onerror = null // prevents looping
                                                currentTarget.src = errorValue.image
                                            }}
                                        />
                                    </div>
                                    <div className='-mt-2 text-center'>
                                        <b className='text-xl'>{artist.name}</b>
                                        <p className='opacity-40'>{formatListened(artist.listen)} Plays</p>
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

export default Artist
