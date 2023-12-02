import React from 'react'
import {CheckCircle} from 'lucide-react'
import Slider from 'react-slick'

const Home = () => {
    const settings = {
        speed: 500,
        autoplay: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
    }
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
                            <p>See all</p>
                        </div>
                        <div className='flex flex-nowrap gap-4 py-2 mx-4'>
                            {listTopSong.map((song) => (
                                <div key={song.id} className={`text-center`}>
                                    <div className='mx-auto w-32 h-32 rounded-2xl overflow-hidden'>
                                        <img src={song.img} alt='' className='object-cover' />
                                    </div>
                                    <b className='text-lg'>{song.name}</b>
                                    <p className='opacity-80 flex items-center justify-center'>
                                        {song.artist.name}
                                        {song.artist.isArtist ?
                                            <span className='ml-2 text-secondary'>
                                                <CheckCircle size={16} strokeWidth={3} />
                                            </span>
                                        :   <></>}
                                    </p>
                                </div>
                            ))}
                            <Slider {...settings}>
                                {/* <div className={`text-center`}>
                                    <div className='mx-auto w-32 h-32 rounded-2xl overflow-hidden'>
                                        <img src={song.img} alt='' className='object-cover' />
                                    </div>
                                    <b className='text-lg'>{song.name}</b>
                                    <p className='opacity-80 flex items-center justify-center'>
                                        {song.artist.name}
                                        {song.artist.isArtist ?
                                            <span className='ml-2 text-secondary'>
                                                <CheckCircle size={16} strokeWidth={3} />
                                            </span>
                                        :   <></>}
                                    </p>
                                </div> */}
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

const uuid = crypto.randomUUID

const listTopSong = [
    {
        id: 1,
        name: 'Exit Sign',
        img: 'https://i.scdn.co/image/ab67616d0000b2738a063486be97d863207e1ca4',
        artist: {
            id: 1,
            name: 'HIEUTHUHAI',
            isArtist: true,
        },
    },
    {
        id: uuid.toString(),
        name: 'Test',
        img: 'https://picsum.photos/200',
        artist: {
            id: uuid.toString(),
            name: 'Artist 1',
            isArtist: false,
        },
    },
    {
        id: uuid.toString(),
        name: 'Demo',
        img: 'https://picsum.photos/200',
        artist: {
            id: uuid.toString(),
            name: 'Artist 2',
            isArtist: true,
        },
    },
    {
        id: uuid.toString(),
        name: 'Tester',
        img: 'https://picsum.photos/200',
        artist: {
            id: uuid.toString(),
            name: 'giadat',
            isArtist: false,
        },
    },
    {
        id: uuid.toString(),
        name: 'Demo 2',
        img: 'https://picsum.photos/200',
        artist: {
            id: uuid.toString(),
            name: 'Artist 4',
            isArtist: false,
        },
    },
]
