import {formatListened, formatName} from '@/hooks/functions'
import {IAlbum} from '@/types/music'
import {IUser} from '@/types/user'
import {errorValue} from '@/utils/constant'
import {Link, useLocation} from 'react-router-dom'
import {useAppDispatch} from '@/app/hook'
import {setListSong} from '@/features/musicSlice'

type Props = {
    title: string
    list: (IAlbum | IUser)[]
}

const ListCard = ({title, list}: Props) => {
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()

    const isAlbum = (item: IAlbum | IUser): item is IAlbum => {
        return (item as IAlbum).image !== undefined
    }

    return (
        <>
            <div className='ml-6'>
                <b className='text-4xl font-extrabold'>{title}</b>
            </div>
            <div className={`w-full h-[850px] overflow-y-scroll`}>
                <div className='m-10 mx-20 max-2xl:mx-10 grid grid-cols-5 gap-14'>
                    {list &&
                        list.map((item) => {
                            return isAlbum(item) ?
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
                                                <b className='text-xl max-2xl:text-sm max-2xl:px-1'>
                                                    {item.name || ''}
                                                </b>
                                                <p className='opacity-40 max-2xl:text-xs:'>
                                                    {`${item.medias?.length} Bài hát`}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                :   <Link to={pathname.concat(`/${item.id}`)} key={item.id}>
                                        <div className='bg-background rounded-xl h-80 max-2xl:h-60'>
                                            <div className='p-6 max-2xl:p-4 mx-auto'>
                                                <img
                                                    src={item.avatar || ''}
                                                    className='rounded-xl h-52 max-2xl:h-40 w-full overflow-hidden object-cover'
                                                    onError={({currentTarget}) => {
                                                        currentTarget.onerror = null // prevents looping
                                                        currentTarget.src = errorValue.image
                                                    }}
                                                />
                                            </div>
                                            <div className='-mt-2 max-2xl:-mt-3 text-center w-full pl-3 truncate'>
                                                <b className='text-xl max-2xl:text-sm max-2xl:px-1'>
                                                    {formatName(item.firstName, item.lastName) || ''}
                                                </b>
                                                <p className='opacity-40 max-2xl:text-xs:'>
                                                    {`${formatListened(item?.listenNumber || 0)} Lượt nghe`}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                        })}
                </div>
            </div>
        </>
    )
}

export default ListCard
