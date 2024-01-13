import {endPoint} from '@/utils/constant'
import {Disc3, Download, Heart, History, Home, ListVideo} from 'lucide-react'
import {Link, useLocation} from 'react-router-dom'

const Sidebar = () => {
    const {pathname} = useLocation()
    return (
        <>
            <div className='w-1/6 fixed z-10 left-0 inset-y-0 bg-sidebar border border-r md:block hidden'>
                <img src='/assets/imgs/logo.png' alt='Logo' className='mx-auto mt-5' />
                {sideMenu.map((menu) => {
                    return (
                        <div className='md:flex md:flex-col' key={menu.title}>
                            <div>
                                <div className='uppercase font-extrabold m-4 max-2xl:ml-16 max-2xl:text-xl text-2xl ml-20'>
                                    {menu.title}
                                </div>
                                <ul>
                                    {menu.list.map((item) => (
                                        <li key={item.title}>
                                            <Link
                                                className={`${
                                                    pathname === item.slug ? 'text-secondary' : ''
                                                } hover:text-secondary hover:cursor-pointer transition-colors duration-150 ease-in-out flex items-center text-xl pl-12 py-3 max-lg:text-base max-2xl:py-2`}
                                                to={item.slug}
                                            >
                                                {item.icon}
                                                <span className='ml-6 max-2xl:ml-2 font-medium capitalize'>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Sidebar

const sideMenu = [
    {
        title: 'Danh Mục',
        list: [
            {
                title: 'Trang Chủ',
                icon: <Home />,
                slug: endPoint.home,
            },
            {
                title: 'Yêu Thích',
                icon: <Heart />,
                slug: endPoint.favor,
            },
        ],
    },
    {
        title: 'Thư Viện',
        list: [
            {
                title: 'Danh Sách Phát',
                icon: <ListVideo />,
                slug: endPoint.playlist.concat('/my-list'),
            },
            {
                title: 'Lịch Sử',
                icon: <History />,
                slug: endPoint.recent,
            },
            {
                title: 'Albums',
                icon: <Disc3 />,
                slug: endPoint.albums,
            },
            {
                title: 'Tải Nhạc',
                icon: <Download />,
                slug: endPoint.download,
            },
            // {
            //     title: 'Đăng Tải',
            //     icon: <Upload />,
            //     slug: endPoint.upload,
            // },
        ],
    },
]
