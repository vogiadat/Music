import 'react-alice-carousel/lib/alice-carousel.css'

const Music = () => {
    return (
        <>
            <div className='ml-6'>
                <div>
                    <b className='text-4xl font-extrabold'>Music</b>
                </div>
                <div className='w-full mt-5 rounded-2xl overflow-hidden bg-background bg-opacity-5'>
                    <div className='flex justify-between items-end mx-4 py-1'>
                        <b className='text-lg'>Top Artist</b>
                        <p>See all</p>
                    </div>
                    <div className='grid grid-flow-col py-2'></div>
                </div>
            </div>
        </>
    )
}

export default Music

const uuid = crypto.getRandomValues

const listSong = [
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
