import {IAlbum} from '@/types/music'
import {IUser} from '@/types/user'
import React, {MouseEventHandler} from 'react'

type Props = {
    title: string
    subtitle: string
    slug: string
    handle?: MouseEventHandler
    list: IAlbum[] | IUser[]
}

const ListCard = ({title, subtitle, slug, handle, list}: Props) => {
    return (
        <>
            <div className='ml-6'>
                <b className='text-4xl font-extrabold'>{title}</b>
            </div>
            <div className={`w-full h-[850px] overflow-y-scroll`}>
                <div className='m-10 mx-20 max-2xl:mx-10 grid grid-cols-5 gap-14'>
                    {list &&
                        list.map((item) => (
                            <Link to={slug.concat(`/${item.id}`)} key={item.id} onClick={handle}>
                                <div className='bg-background rounded-xl h-80 max-2xl:h-60'>
                                    <div className='p-6 max-2xl:p-4 mx-auto'>
                                        <img
                                            src={item.image || item.avatar || ''}
                                            className='rounded-xl h-52 max-2xl:h-40 overflow-hidden object-cover'
                                            onError={({currentTarget}) => {
                                                currentTarget.onerror = null // prevents looping
                                                currentTarget.src = errorValue.image
                                            }}
                                        />
                                    </div>
                                    <div className='-mt-2 max-2xl:-mt-3 text-center'>
                                        <b className='text-xl max-2xl:text-sm max-2xl:px-1'>{album.name}</b>
                                        <p className='opacity-40 max-2xl:text-xs:'>{album.medias?.length} songs</p>
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
