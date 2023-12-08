import {formatListened} from '@/hooks/functions'
import {errorValue} from '@/utils/constant'
import {CheckCircle} from 'lucide-react'
import {Link} from 'react-router-dom'
import {endPoint} from '../utils/constant'
import {useState, useEffect} from 'react'
import {IMusic} from '@/types/music'
import {getAllMusic} from '@/services/music.service'
import {useDispatch} from 'react-redux'
import {setMusic} from '@/features/musicSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

const Home = () => {
    const settingSong = {
        infinite: listTopArtist.length >= 3 ? true : false,
        autoplaySpeed: 3000,
        autoplay: true,
        lazyload: true,
        arrows: false,
        slidesToShow: listTopArtist.length >= 3 ? 3 : listTopArtist.length,
        slidesToScroll: 2,
        variableWidth: true,
    }

    const settingAritist = {
        infinite: listTopArtist.length >= 5 ? true : false,
        autoplaySpeed: 2500,
        autoplay: true,
        lazyload: true,
        arrows: false,
        slidesToShow: listTopArtist.length >= 5 ? 5 : listTopArtist.length,
        slidesToScroll: 2,
        variableWidth: true,
    }

    const dispatch = useDispatch()
    const [listTopSong, setListTopSong] = useState<IMusic[]>()

    const handlePlayMusic = (song: IMusic) => {
        dispatch(setMusic(song))
    }
    useEffect(() => {
        getAllMusic().then((res) => {
            setListTopSong(res.element)
        })
    }, [])

    return (
        <>
            <div className='grid grid-cols-2'>
                <div className='ml-6'>
                    <div className=''>
                        <div>
                            <p className='opacity-80'>Trending</p>
                            <b className='text-4xl font-extrabold'>Godly</b>
                            <p className='opacity-80'>Omah Lay</p>
                        </div>
                        <div className='flex mt-4 font-semibold text-lg'>
                            <button className='flex bg-secondary px-3 rounded-xl mr-1 items-center hover:opacity-80'>
                                <span className='mr-2'>Play Now</span>
                                <svg
                                    width='28'
                                    height='28'
                                    viewBox='0 0 28 28'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        className='fill-current'
                                        d='M20.0682 17.3504L9.33069 24.5037C8.41944 25.1101 7.25 24.3758 7.25 23.1533V8.84675C7.25 7.62613 8.41775 6.88988 9.33069 7.49825L20.0682 14.6515C20.2755 14.7874 20.4478 14.9838 20.5677 15.2208C20.6875 15.4578 20.7507 15.7269 20.7507 16.001C20.7507 16.275 20.6875 16.5442 20.5677 16.7812C20.4478 17.0182 20.2755 17.2146 20.0682 17.3504Z'
                                    />
                                </svg>
                            </button>
                            <button className='bg-white text-black text-3xl py-1 px-3 rounded-lg hover:opacity-80'>
                                +
                            </button>
                        </div>
                    </div>
                    <div
                        className='w-2/3 mt-5 rounded-2xl overflow-hidden'
                        style={{
                            background:
                                'linear-gradient(284deg, rgba(32, 32, 32, 0.09) 0%, rgba(32, 32, 32, 0.86) 100%)',
                        }}
                    >
                        <div className='flex justify-between items-end mx-4 py-1'>
                            <b className='text-lg'>Billboard Topchart</b>
                            <Link to={endPoint.trend}>
                                <span className='hover:cursor-pointer hover:text-secondary p-3'>See all</span>
                            </Link>
                        </div>
                        <div className='grid grid-flow-col py-2'>
                            {listTopSong && (
                                <Slider {...settingSong} className='mx-2'>
                                    {listTopSong.map((song: IMusic) => (
                                        <div
                                            key={song.id}
                                            className='text-center'
                                            onClick={() => handlePlayMusic(song)}
                                        >
                                            <div className='mx-auto w-32 h-32 rounded-2xl overflow-hidden'>
                                                <img
                                                    src={song.image}
                                                    alt=''
                                                    className='object-cover'
                                                    onError={({currentTarget}) => {
                                                        currentTarget.onerror = null // prevents looping
                                                        currentTarget.src = errorValue.image
                                                    }}
                                                />
                                            </div>
                                            <div className='w-40 truncate'>
                                                <b className='text-lg truncate'>{song.name}</b>
                                                <p className='opacity-80 flex items-center justify-center'>
                                                    {song.author?.firstName || '' + song.author?.lastName || ''}
                                                    {song.author?.isPremium ?
                                                        <span className='ml-2 text-secondary'>
                                                            <CheckCircle size={16} strokeWidth={3} />
                                                        </span>
                                                    :   <></>}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            )}
                        </div>
                    </div>
                    <div
                        className='w-[800px] mt-5 rounded-2xl overflow-hidden'
                        style={{
                            background: 'linear-gradient(95deg, rgba(32, 32, 32, 0.10) 0%, #202020 100%)',
                            backdropFilter: 'blur(6px)',
                        }}
                    >
                        <div className='flex justify-between items-end mx-4 py-1'>
                            <b className='text-lg'>Top Artist</b>
                            <p>See all</p>
                        </div>
                        <div className='h-52'>
                            <Slider {...settingAritist} className='w-full'>
                                {listTopArtist.map((artist) => (
                                    <div key={artist.name} className={`text-center px-4 py-2`}>
                                        <div className='mx-auto mb-2 w-32 h-32 rounded-full overflow-hidden'>
                                            <img
                                                src={artist.avatar}
                                                className='object-cover'
                                                onError={({currentTarget}) => {
                                                    currentTarget.onerror = null // prevents looping
                                                    currentTarget.src = errorValue.image
                                                }}
                                            />
                                        </div>
                                        <b className='text-lg'>{artist.name}</b>
                                        <p className='opacity-80 flex items-center justify-center'>
                                            {formatListened(artist.listen)}
                                        </p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className='h-full w-full m-5'>
                    <img src='./src/assets/imgs/background.jpg' alt='' className='object-cover' />
                </div>
            </div>
        </>
    )
}

export default Home
