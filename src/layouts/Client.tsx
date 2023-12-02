import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {
    Volume,
    Volume1,
    Volume2,
    VolumeX,
    SkipForward,
    SkipBack,
    Repeat2,
    Shuffle,
    PlayCircle,
    PauseCircle,
} from 'lucide-react'
import {Slider} from '@/components/ui/slider'
import {Outlet} from 'react-router-dom'
import {useMemo, useState} from 'react'

const Client = () => {
    const initAudio = useMemo(() => {
        return new Audio(music.src)
    }, [])

    const [volume, setVolume] = useState(100)
    const [isPlay, setIsPlay] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)

    const handleChangeVolume = (value: number[]) => {
        const newVolume = value.at(0) || 0
        setVolume(newVolume)
        initAudio.volume = newVolume / 100
    }

    const handleMoveTime = (value: number[]) => {
        const time = value.at(0) || 0
        setCurrentTime(time)
        initAudio.currentTime = (initAudio.duration / 100) * time
    }

    const toggleMusic = () => {
        setIsPlay(!isPlay)
        if (initAudio && !isPlay) {
            initAudio.play()
        } else {
            initAudio.pause()
        }
    }

    return (
        <>
            <div className='grid grid-cols-12 fixed z-20 inset-0 bg-black text-white'>
                <div className='col-span-2 bg-sidebar border border-r'>
                    <img src='/src/assets/imgs/logo.png' alt='Logo' className='mx-auto mt-5' />
                    {sidebarList.map((menu) => {
                        return (
                            <div className='flex flex-col' key={menu.title}>
                                <div>
                                    <div className='m-4 ml-20 text-3xl uppercase font-extrabold'>{menu.title}</div>
                                    <ul>
                                        {menu.list.map((item) => (
                                            <li
                                                className='flex items-center text-xl pl-16 py-3 hover:text-secondary hover:cursor-pointer  transition-colors duration-150 ease-in-out'
                                                key={item.title}
                                            >
                                                {item.icon}
                                                <span className='ml-6 font-medium capitalize'>{item.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='col-span-10'>
                    <div className='flex justify-around py-5'>
                        <div className='flex-1'>
                            <ul className='flex justify-evenly text-xl font-medium uppercase'>
                                <li className='hover:text-secondary hover:cursor-pointer transition-colors duration-150 ease-in-out'>
                                    Music
                                </li>
                                <li className='hover:text-secondary hover:cursor-pointer transition-colors duration-150 ease-in-out'>
                                    Artists
                                </li>
                                <li className='hover:text-secondary hover:cursor-pointer transition-colors duration-150 ease-in-out'>
                                    Trend
                                </li>
                            </ul>
                        </div>
                        <div className='flex-1'>
                            <div className='-m-1 w-3/4 relative'>
                                <input
                                    type='text'
                                    name=''
                                    id=''
                                    className='bg-background w-full px-3 py-2 rounded-xl placeholder-shown:pl-10 placeholder:text-sm'
                                    placeholder='Type your search here...'
                                />
                                <button
                                    type='submit'
                                    className='opacity-40 hover:text-secondary hover:opacity-60 transition-colors duration-150 ease-in-out'
                                >
                                    <svg
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='absolute top-1 right-6'
                                    >
                                        <path
                                            d='M13 23C15.2187 22.9995 17.3735 22.2568 19.1213 20.89L24.6162 26.385L26.3838 24.6175L20.8888 19.1225C22.2563 17.3746 22.9995 15.2193 23 13C23 7.48625 18.5138 3 13 3C7.48625 3 3 7.48625 3 13C3 18.5138 7.48625 23 13 23ZM13 5.5C17.1362 5.5 20.5 8.86375 20.5 13C20.5 17.1362 17.1362 20.5 13 20.5C8.86375 20.5 5.5 17.1362 5.5 13C5.5 8.86375 8.86375 5.5 13 5.5Z'
                                            className='fill-current'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='flex mr-20 justify-end'>
                                <ul className='flex ml-4'>
                                    <li>
                                        <svg
                                            width='28'
                                            height='28'
                                            viewBox='-1 0 16 21'
                                            fill='none'
                                            xmlns='http://www.w2.org/2000/svg'
                                        >
                                            <path
                                                d='M6.9975 21C7.46723 21 6.95868 20.7788 6.58373 20.3849C6.20877 19.9911 5.99812 19.457 5.99812 18.9H9.99687C9.99687 19.457 9.78623 19.9911 9.41127 20.3849C9.03631 20.7788 8.52777 21 7.9975 21ZM15.995 17.85H0V15.75L1.99937 14.7V8.925C1.94671 7.44358 2.26523 5.97359 2.92309 4.662C3.24682 4.06064 3.68828 3.5382 4.21833 3.12916C4.74838 2.72012 5.35499 2.43377 5.99812 2.289V4.37546e-06H9.64298C9.00967 0.743413 8.61661 1.67828 8.52012 2.67068C8.42364 3.66309 8.62867 4.6621 9.10585 5.52462C9.58302 6.38714 10.3079 7.06891 11.1765 7.47225C12.0452 7.87559 13.0131 7.97982 13.9416 7.77C13.9766 8.14485 13.9936 8.53335 13.9936 8.925V14.7L15.993 15.75V17.85H15.995ZM12.9959 6.3C12.6021 6.29931 12.2122 6.21715 11.8486 6.05821C11.485 5.89928 11.1548 5.66667 10.8767 5.37368C10.5987 5.08069 10.3784 4.73305 10.2283 4.35061C10.0781 3.96817 10.0012 3.55842 10.0019 3.14475C10.0025 2.73109 10.0808 2.32161 10.2321 1.9397C10.3834 1.55779 10.6049 1.21092 10.8838 0.918905C11.1628 0.626888 11.4937 0.39544 11.8579 0.237775C12.222 0.0801095 12.6121 -0.00068507 13.0059 4.37546e-06C13.8013 0.00139677 14.5636 0.334606 15.1251 0.92633C15.6866 1.51805 16.0013 2.31982 16 3.15525C15.9987 3.99069 15.6814 4.79135 15.1181 5.3811C14.5547 5.97086 13.7913 6.3014 12.9959 6.3Z'
                                                fill='white'
                                            />
                                        </svg>
                                    </li>
                                    <li className='ml-4'>
                                        <svg
                                            width='30'
                                            height='30'
                                            viewBox='-1 0 24 25'
                                            fill='none'
                                            xmlns='http://www.w2.org/2000/svg'
                                        >
                                            <path
                                                d='M20.675 9.83515L20.1398 11.1476C20.2125 11.593 20.25 12.0476 20.25 12.5023C20.25 12.957 20.2125 13.4117 20.1398 13.857L21.675 15.1695C21.7908 15.2687 21.8737 15.4007 21.9126 15.548C21.9515 15.6954 21.9447 15.8511 21.893 15.9945L21.8719 16.0555C21.4492 17.2367 20.8164 18.3316 20.0039 19.2875L19.9617 19.3367C19.8631 19.4526 19.7318 19.5359 19.5849 19.5757C19.4381 19.6154 19.2826 19.6097 19.1391 19.5594L17.2336 18.882C16.5305 19.4586 15.7453 19.9133 14.8969 20.232L14.5289 22.2242C14.5011 22.3741 14.4284 22.512 14.3204 22.6196C14.2124 22.7272 14.0742 22.7994 13.9242 22.8266L13.8609 22.8383C12.6398 23.0586 11.3555 23.0586 10.1344 22.8383L10.0711 22.8266C9.92108 22.7994 9.78289 22.7272 9.67488 22.6196C9.56688 22.512 9.49416 22.3741 9.4664 22.2242L9.09609 20.2226C8.25442 19.9038 7.47062 19.4494 6.77577 18.8773L4.85624 19.5594C4.71272 19.6101 4.55716 19.616 4.41022 19.5762C4.26327 19.5365 4.13191 19.4529 4.03359 19.3367L3.9914 19.2875C3.17987 18.331 2.54712 17.2362 2.12343 16.0555L2.10234 15.9945C1.99687 15.7016 2.08359 15.3734 2.32031 15.1695L3.87421 13.843C3.80156 13.4023 3.7664 12.9523 3.7664 12.5047C3.7664 12.0547 3.80156 11.6047 3.87421 11.1664L2.32031 9.83984C2.20451 9.74071 2.12164 9.60869 2.0827 9.46132C2.04377 9.31395 2.05062 9.15822 2.10234 9.01484L2.12343 8.9539C2.54765 7.77265 3.17577 6.6828 3.9914 5.72187L4.03359 5.67265C4.13215 5.55676 4.26352 5.47344 4.41037 5.4337C4.55723 5.39395 4.71268 5.39963 4.85624 5.44999L6.77577 6.13202C7.47421 5.5578 8.25468 5.10312 9.09609 4.78671L9.4664 2.78515C9.49416 2.63525 9.56688 2.49734 9.67488 2.38975C9.78289 2.28216 9.92108 2.20998 10.0711 2.1828L10.1344 2.17109C11.3667 1.94959 12.6286 1.94959 13.8609 2.17109L13.9242 2.1828C14.0742 2.20998 14.2124 2.28216 14.3204 2.38975C14.4284 2.49734 14.5011 2.63525 14.5289 2.78515L14.8969 4.77734C15.745 5.09525 16.5345 5.55142 17.2336 6.12733L19.1391 5.44999C19.2826 5.39923 19.4381 5.39334 19.5851 5.43312C19.732 5.47289 19.8634 5.55643 19.9617 5.67265L20.0039 5.72187C20.8195 6.68515 21.4476 7.77265 21.8719 8.9539L21.893 9.01484C21.9984 9.30312 21.9117 9.63124 21.675 9.83515ZM18.4758 13.5805C18.5344 13.2266 18.5648 12.8633 18.5648 12.5C18.5648 12.1367 18.5344 11.7734 18.4758 11.4195L18.3211 10.4797L20.0719 8.98202C19.8065 8.37056 19.4714 7.79174 19.0734 7.25702L16.8984 8.02812L16.1625 7.42343C15.6023 6.96406 14.9789 6.60312 14.3039 6.34999L13.4109 6.01484L12.9914 3.7414C12.3295 3.6664 11.6612 3.6664 10.9992 3.7414L10.5797 6.01952L9.69374 6.35937C9.02577 6.61249 8.40468 6.97343 7.84921 7.43046L7.11327 8.03749L4.92421 7.25937C4.52577 7.79609 4.19296 8.37499 3.92577 8.98437L5.69531 10.4961L5.54296 11.4336C5.48671 11.7828 5.45624 12.1437 5.45624 12.5C5.45624 12.8586 5.48437 13.2172 5.54296 13.5664L5.69531 14.5039L3.92577 16.0156C4.19062 16.6273 4.52577 17.2039 4.92421 17.7406L7.11327 16.9625L7.84921 17.5695C8.40468 18.0266 9.02577 18.3875 9.69374 18.6406L10.582 18.9758L11.0016 21.2539C11.6601 21.3289 12.3328 21.3289 12.9937 21.2539L13.4133 18.9805L14.3062 18.6453C14.9789 18.3922 15.6047 18.0312 16.1648 17.5719L16.9008 16.9672L19.0758 17.7383C19.4742 17.2016 19.807 16.6226 20.0742 16.0133L18.3234 14.5156L18.4758 13.5805ZM12 16.8594C9.72187 16.8594 7.87499 15.0125 7.87499 12.7344C7.87499 10.4562 9.72187 8.60937 12 8.60937C14.2781 8.60937 16.125 10.4562 16.125 12.7344C16.125 15.0125 14.2781 16.8594 12 16.8594ZM13.8562 10.8781C13.6128 10.634 13.3234 10.4403 13.0049 10.3084C12.6863 10.1765 12.3448 10.1088 12 10.1094C11.2992 10.1094 10.6406 10.3836 10.1437 10.8781C9.89958 11.1216 9.70596 11.4109 9.57403 11.7295C9.4421 12.0481 9.37446 12.3896 9.37499 12.7344C9.37499 13.4351 9.64921 14.0937 10.1437 14.5906C10.6406 15.0875 11.2992 15.3594 12 15.3594C12.7008 15.3594 13.3594 15.0875 13.8562 14.5906C14.1004 14.3472 14.294 14.0578 14.426 13.7392C14.5579 13.4207 14.6255 13.0792 14.625 12.7344C14.625 12.0336 14.3508 11.375 13.8562 10.8781Z'
                                                fill='white'
                                            />
                                        </svg>
                                    </li>
                                </ul>
                                <div className='flex items-center -my-1 ml-4'>
                                    <Avatar>
                                        <AvatarImage src={user.avatarUrl} alt={user.name[0]} />
                                        <AvatarFallback>{user.name}</AvatarFallback>
                                    </Avatar>
                                    <span className='ml-4'>CN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='z-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className='bg-background fixed z-20 inset-x-0 bottom-0 grid grid-cols-12 items-center text-white h-32 max-h-32'>
                <div className='col-span-3 flex justify-evenly items-center mx-10'>
                    <div className='h-28 w-28 rounded-lg overflow-auto shadow shadow-gray-900'>
                        <img src={music.img} alt='' className='object-cover' />
                    </div>
                    <div className='text-center'>
                        <b className='text-xl '>{music.name}</b>
                        <p className='text-md'>{music.artist}</p>
                    </div>
                    <div>
                        <button>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className={`${
                                    music.isFavor ? 'stroke-secondary fill-secondary' : 'stroke-current fill-none'
                                } lucide lucide-heart`}
                            >
                                <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
                            </svg>
                        </button>
                        <button className='ml-4'>
                            <svg
                                width='30'
                                height='30'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M4.5 14.25C3.90326 14.25 3.33097 14.0129 2.90901 13.591C2.48705 13.169 2.25 12.5967 2.25 12C2.25 11.4033 2.48705 10.831 2.90901 10.409C3.33097 9.98705 3.90326 9.75 4.5 9.75C5.09674 9.75 5.66903 9.98705 6.09099 10.409C6.51295 10.831 6.75 11.4033 6.75 12C6.75 12.5967 6.51295 13.169 6.09099 13.591C5.66903 14.0129 5.09674 14.25 4.5 14.25ZM12 14.25C11.4033 14.25 10.831 14.0129 10.409 13.591C9.98705 13.169 9.75 12.5967 9.75 12C9.75 11.4033 9.98705 10.831 10.409 10.409C10.831 9.98705 11.4033 9.75 12 9.75C12.5967 9.75 13.169 9.98705 13.591 10.409C14.0129 10.831 14.25 11.4033 14.25 12C14.25 12.5967 14.0129 13.169 13.591 13.591C13.169 14.0129 12.5967 14.25 12 14.25ZM19.5 14.25C18.9033 14.25 18.331 14.0129 17.909 13.591C17.4871 13.169 17.25 12.5967 17.25 12C17.25 11.4033 17.4871 10.831 17.909 10.409C18.331 9.98705 18.9033 9.75 19.5 9.75C20.0967 9.75 20.669 9.98705 21.091 10.409C21.5129 10.831 21.75 11.4033 21.75 12C21.75 12.5967 21.5129 13.169 21.091 13.591C20.669 14.0129 20.0967 14.25 19.5 14.25Z'
                                    className='fill-current'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='col-span-6'>
                    <div className='grid w-5/6 mx-auto'>
                        <div className='row'>
                            <ul className='flex w-2/5 mx-auto justify-around items-center'>
                                <li>
                                    <button>
                                        <Repeat2 />
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <SkipBack />
                                    </button>
                                </li>
                                <li className='w-20 h-20 flex items-center justify-center'>
                                    <button type='button' onClick={toggleMusic} className=''>
                                        {!isPlay ?
                                            <PlayCircle size={60} strokeWidth={1} />
                                        :   <PauseCircle size={60} strokeWidth={1} className='stroke-secondary' />}
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <SkipForward />
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <Shuffle />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='row mt-2'>
                            <Slider
                                defaultValue={[0]}
                                value={[currentTime]}
                                min={0}
                                max={Number(initAudio.duration)}
                                step={Number(initAudio.duration) / 100}
                                onValueCommit={handleMoveTime}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-3 flex justify-center'>
                    <div className='w-7/12 flex'>
                        <div className='mr-5'>
                            {volume == 0 ?
                                <VolumeX />
                            : volume < 20 ?
                                <Volume />
                            : volume < 60 ?
                                <Volume1 />
                            :   <Volume2 />}
                        </div>
                        <Slider
                            value={[volume]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={handleChangeVolume}
                            className='volume'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Client

const user = {
    name: 'Gia Dat',
    avatarUrl: 'https://github.com/shadcn.png',
}

const sidebarList = [
    {
        title: 'menu',
        list: [
            {
                title: 'Home',
                icon: (
                    <svg width='18' height='18' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M12.9404 6.90431L7.309 1.27697C7.26845 1.23634 7.22029 1.20411 7.16727 1.18212C7.11425 1.16012 7.05741 1.1488 7.00001 1.1488C6.94261 1.1488 6.88578 1.16012 6.83276 1.18212C6.77974 1.20411 6.73158 1.23634 6.69103 1.27697L1.05958 6.90431C0.89552 7.06837 0.802551 7.29122 0.802551 7.52365C0.802551 8.00626 1.19493 8.39865 1.67755 8.39865H2.27091V12.4141C2.27091 12.6561 2.46642 12.8516 2.70841 12.8516H6.12501V9.78907H7.65626V12.8516H11.2916C11.5336 12.8516 11.7291 12.6561 11.7291 12.4141V8.39865H12.3225C12.5549 8.39865 12.7777 8.30704 12.9418 8.14161C13.2822 7.79982 13.2822 7.24611 12.9404 6.90431Z'
                            className='fill-current'
                            fillOpacity='0.87'
                        />
                    </svg>
                ),
                slug: '',
            },
            {
                title: 'favourite',
                icon: (
                    <svg width='18' height='18' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M7.00002 6.35832C6.64419 6.35832 6.35835 6.64416 6.35835 6.99999C6.35835 7.35582 6.64419 7.64166 7.00002 7.64166C7.35585 7.64166 7.64169 7.35582 7.64169 6.99999C7.64169 6.64416 7.35585 6.35832 7.00002 6.35832ZM7.00002 1.16666C3.78002 1.16666 1.16669 3.77999 1.16669 6.99999C1.16669 10.22 3.78002 12.8333 7.00002 12.8333C10.22 12.8333 12.8334 10.22 12.8334 6.99999C12.8334 3.77999 10.22 1.16666 7.00002 1.16666ZM8.27752 8.27749L3.50002 10.5L5.72252 5.72249L10.5 3.49999L8.27752 8.27749Z'
                            className='fill-current'
                            fillOpacity='0.87'
                        />
                    </svg>
                ),
                slug: '',
            },
        ],
    },
    {
        title: 'library',
        list: [
            {
                title: 'recent',
                icon: (
                    <svg width='18' height='18' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M8 2.16665C9.15372 2.16665 10.2815 2.50877 11.2408 3.14973C12.2001 3.7907 12.9478 4.70173 13.3893 5.76762C13.8308 6.83351 13.9463 8.00639 13.7212 9.13793C13.4962 10.2695 12.9406 11.3089 12.1248 12.1247C11.309 12.9405 10.2696 13.496 9.13802 13.7211C8.00647 13.9462 6.83358 13.8307 5.76768 13.3891C4.70178 12.9476 3.79073 12.2 3.14976 11.2407C2.50879 10.2814 2.16667 9.15363 2.16667 7.99992C2.16667 7.84521 2.10521 7.69684 1.99581 7.58744C1.88642 7.47805 1.73804 7.41659 1.58333 7.41659C1.42862 7.41659 1.28025 7.47805 1.17085 7.58744C1.06146 7.69684 1 7.84521 1 7.99992C0.999964 9.60267 1.54995 11.1569 2.55807 12.4029C3.56618 13.6489 4.97137 14.5112 6.53883 14.8458C8.1063 15.1803 9.7411 14.9669 11.1701 14.241C12.5991 13.5152 13.7357 12.321 14.3901 10.8579C15.0444 9.39475 15.1768 7.75141 14.7652 6.20241C14.3536 4.65342 13.4229 3.29258 12.1286 2.34728C10.8343 1.40198 9.25473 0.929479 7.65392 1.00872C6.05311 1.08796 4.52797 1.71414 3.33333 2.78265V1.58333C3.33333 1.42862 3.27187 1.28025 3.16248 1.17085C3.05308 1.06146 2.90471 1 2.75 1C2.59529 1 2.44692 1.06146 2.33752 1.17085C2.22812 1.28025 2.16667 1.42862 2.16667 1.58333V5.08328C2.16667 5.23799 2.22812 5.38636 2.33752 5.49576C2.44692 5.60515 2.59529 5.66661 2.75 5.66661H5.08333C5.23804 5.66661 5.38641 5.60515 5.49581 5.49576C5.60521 5.38636 5.66667 5.23799 5.66667 5.08328C5.66667 4.92858 5.60521 4.78021 5.49581 4.67081C5.38641 4.56142 5.23804 4.49996 5.08333 4.49996H3.33333C3.87619 3.77495 4.58065 3.18655 5.39076 2.7815C6.20086 2.37645 7.09427 2.16593 8 2.16665ZM8.00116 5.08328C8.00116 4.92858 7.93971 4.78021 7.83031 4.67081C7.72091 4.56142 7.57254 4.49996 7.41783 4.49996C7.26312 4.49996 7.11475 4.56142 7.00535 4.67081C6.89596 4.78021 6.8345 4.92858 6.8345 5.08328V8.58324C6.8345 8.73795 6.89596 8.88632 7.00535 8.99572C7.11475 9.10511 7.26312 9.16657 7.41783 9.16657H9.75116C9.90587 9.16657 10.0542 9.10511 10.1636 8.99572C10.273 8.88632 10.3345 8.73795 10.3345 8.58324C10.3345 8.42853 10.273 8.28016 10.1636 8.17077C10.0542 8.06137 9.90587 7.99992 9.75116 7.99992H8.00116V5.08328Z'
                            className='fill-current'
                        />
                    </svg>
                ),
                slug: '',
            },
            {
                title: 'Albums',
                icon: (
                    <svg width='18' height='18' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M7.99998 1.33334C4.31998 1.33334 1.33331 4.32 1.33331 8C1.33331 11.68 4.31998 14.6667 7.99998 14.6667C11.68 14.6667 14.6666 11.68 14.6666 8C14.6666 4.32 11.68 1.33334 7.99998 1.33334ZM7.99998 11C6.33998 11 4.99998 9.66 4.99998 8C4.99998 6.34 6.33998 5 7.99998 5C9.65998 5 11 6.34 11 8C11 9.66 9.65998 11 7.99998 11ZM7.99998 7.33334C7.63331 7.33334 7.33331 7.63334 7.33331 8C7.33331 8.36667 7.63331 8.66667 7.99998 8.66667C8.36665 8.66667 8.66665 8.36667 8.66665 8C8.66665 7.63334 8.36665 7.33334 7.99998 7.33334Z'
                            className='fill-current'
                            fillOpacity='0.87'
                        />
                    </svg>
                ),
                slug: '',
            },
            {
                title: 'Downloads',
                icon: (
                    <svg width='18' height='18' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M5.66667 1.5H10.3333V6.08667H13.24L10.6233 8.78667L8 11.4867L5.38 8.78667L2.76333 6.08667H5.66667V1.5ZM2.64667 12.8833H13.3533V14.5H2.64667V12.8833Z'
                            className='stroke-current'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                ),
                slug: '',
            },
            {
                title: 'Upload',
                icon: (
                    <svg width='18' height='18' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M13.3333 4H7.99998L6.66665 2.66667H2.66665C1.93331 2.66667 1.33998 3.26667 1.33998 4L1.33331 12C1.33331 12.7333 1.93331 13.3333 2.66665 13.3333H13.3333C14.0666 13.3333 14.6666 12.7333 14.6666 12V5.33333C14.6666 4.6 14.0666 4 13.3333 4ZM13.3333 12H2.66665V5.33333H13.3333V12ZM5.33331 8.67333L6.27331 9.61333L7.33331 8.56V11.3333H8.66665V8.56L9.72665 9.62L10.6666 8.67333L8.00665 6L5.33331 8.67333Z'
                            className='fill-current'
                        />
                    </svg>
                ),
                slug: '',
            },
        ],
    },
]
const music = {
    name: 'Exit Sign',
    artist: 'HIEUTHUHAI',
    img: 'https://i.scdn.co/image/ab67616d0000b2738a063486be97d863207e1ca4',
    src: 'https://a128-zmp3.zmdcdn.me/7344b975eefcf8d39c675a8a7a2fe245?authen=exp=1701578792~acl=/7344b975eefcf8d39c675a8a7a2fe245/*~hmac=3b87853ee60dafbc8ef4cb7960a61029',
    isFavor: false,
}
