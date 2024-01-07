import ListCard from '@/components/Layout/ListCard'
import {getAllArtist} from '@/services/user.service'
import {IUser} from '@/types/user'
import {useEffect, useState} from 'react'

const Artist = () => {
    const [listArtist, setListArtist] = useState<IUser[]>([])

    useEffect(() => {
        getAllArtist().then((res) => {
            setListArtist(res.element)
        })
    }, [])

    return (
        <>
            <ListCard title='Nghệ sĩ' list={listArtist} />
        </>
    )
}

export default Artist
