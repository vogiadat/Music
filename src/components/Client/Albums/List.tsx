import {IAlbum} from '@/types/music'
import {errorValue} from '@/utils/constant'
import {Link, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '@/app/hook'
import {setListSong} from '@/features/musicSlice'

type Props = {
    title: string
    list: IAlbum[]
}

const ListCard = ({title, list}: Props) => {
    const {pathname} = useLocation()
    const {music} = useAppSelector((state) => state.music)
    const dispatch = useAppDispatch()

    return (
        <>
            <div className='ml-6'>
                <b className='text-4xl font-extrabold'>{title}</b>
            </div>
            <div className={`w-full ${music && 'max-h-[680px]'} h-[850px] overflow-y-scroll`}>
                <div className='m-10 mx-20 max-2xl:mx-10 grid grid-cols-5 gap-14'>
                    {list &&
                        list.map((item) => (
                            <Link
                                to={pathname.concat(`/${item.id}`)}
                                key={item.id}
                                onClick={() => dispatch(setListSong(item))}
                            >
                                <div className='bg-background rounded-xl h-80 max-2xl:h-60'>
                                    <div className='p-6 max-2xl:p-4 mx-auto'>
                                        <img
                                            src={item.image || ''}
                                            className='rounded-xl h-52 max-2xl:h-40 w-full overflow-hidden object-cover'
                                            onError={({currentTarget}) => {
                                                currentTarget.onerror = null // prevents looping
                                                currentTarget.src = errorValue.image
                                            }}
                                        />
                                    </div>
                                    <div className='-mt-2 max-2xl:-mt-3 text-center w-full pl-3 truncate'>
                                        <b className='text-xl max-2xl:text-sm max-2xl:px-1'>{item.name || ''}</b>
                                        <p className='opacity-40 max-2xl:text-xs:'>
                                            {`${item.medias?.length} Bài hát`}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    )
}

export default ListCard
