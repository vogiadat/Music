import {formatName} from '@/hooks/functions'
import {CheckCircle, Play} from 'lucide-react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {IMusic} from '@/types/music'
import {getAllTrending} from '@/services/music.service'
import {endPoint, errorValue} from '@/utils/constant'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {currentSong} from '@/features/musicSlice'
import {useToast} from '@/components/ui/use-toast'
import {getAllArtist} from '@/services/user.service'
import {IUser} from '@/types/user'

const Home = () => {
    const {toast} = useToast()
    const {user} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [trend, setTrend] = useState<IMusic>()
    const [listSong, setListSong] = useState<IMusic[]>([])
    const [listArtist, setListArtist] = useState<IUser[]>([])
    console.log(user)
    const settingSong = {
        infinite: listSong.length < 3 ? false : true,
        autoplaySpeed: 3000,
        autoplay: true,
        lazyload: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        variableWidth: true,
    }
    const settingAritist = {
        infinite: true,
        autoplaySpeed: 2500,
        autoplay: true,
        lazyload: true,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        variableWidth: true,
    }

    useEffect(() => {
        getAllTrending().then((res) => {
            setListSong(
                res.element.map((song) => {
                    return song.media
                }),
            )
            setTrend(res.element.at(0)?.media)
        })
        getAllArtist().then((res) => {
            setListArtist(res.element)
        })
    }, [])

    const handlePlayMusic = (song: IMusic) => {
        if (!user && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need login to listen this music',
            })
        if (!user?.isPremium && song.isPremium)
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Need buy premium to listen this music',
            })
        dispatch(currentSong({song, listSong}))
    }

    return (
        <>
            <div className='grid grid-cols-2'>
                <div className='ml-6'>
                    <div className=''>
                        <div>
                            <p className='opacity-80'>Trending</p>
                            <b className='text-4xl font-extrabold'>{trend?.name || 'Godly'}</b>
                            <p className='opacity-80'>
                                {formatName(trend?.author?.firstName || '', trend?.author?.lastName || '') ||
                                    'Omah Lay'}
                            </p>
                        </div>
                        <div className='flex mt-4 font-semibold text-lg'>
                            <button
                                className='flex bg-secondary px-3 rounded-xl mr-1 items-center hover:opacity-80'
                                onClick={() => handlePlayMusic(trend)}
                            >
                                <span className='mr-2'>Play Now</span>
                                <Play />
                            </button>
                            <Link
                                to={endPoint.trend}
                                className='bg-white text-black text-3xl py-1 px-3 rounded-lg hover:opacity-80'
                            >
                                +
                            </Link>
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
                            {listSong && (
                                <Slider {...settingSong} className='mx-2'>
                                    {listSong.map((song: IMusic) => (
                                        <div
                                            key={song.id}
                                            className='text-center hover:cursor-pointer'
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
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            )}
                        </div>
                    </div>
                    <div
                        className='mt-5 rounded-2xl overflow-hidden'
                        style={{
                            background: 'linear-gradient(95deg, rgba(32, 32, 32, 0.10) 0%, #202020 100%)',
                            backdropFilter: 'blur(6px)',
                        }}
                    >
                        <div className='flex justify-between items-end mx-4 py-1'>
                            <b className='text-lg'>Top Artist</b>
                            <Link to={endPoint.artist}>See all</Link>
                        </div>
                        <div className='h-52 grid grid-flow-col'>
                            <Slider {...settingAritist} className='w-full'>
                                {listArtist &&
                                    listArtist.map((artist) => (
                                        <Link
                                            to={endPoint.artist.concat(`/${artist.id}`)}
                                            key={artist.id}
                                            className={`text-center px-3 py-2`}
                                        >
                                            <div className='mb-2 w-32 h-32 rounded-full overflow-hidden'>
                                                <img
                                                    src={artist.avatar}
                                                    className='object-cover'
                                                    onError={({currentTarget}) => {
                                                        currentTarget.onerror = null // prevents looping
                                                        currentTarget.src = errorValue.image
                                                    }}
                                                />
                                            </div>
                                            <p className=''></p>
                                            <b className='opacity-80 flex items-center justify-center text-lg'>
                                                {formatName(artist.firstName || '', artist.lastName || '')}
                                                {artist?.isPremium ?
                                                    <span className='ml-2 text-secondary'>
                                                        <CheckCircle size={16} strokeWidth={3} />
                                                    </span>
                                                :   <></>}
                                            </b>
                                            <p className='opacity-80 flex items-center justify-center'>
                                                {/* {formatListened(artist.listen)} */}
                                            </p>
                                        </Link>
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
