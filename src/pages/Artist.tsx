import {List} from '@/components/Client/Artist'
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
            <List title='Nghệ Sĩ' list={listArtist} />
        </>
    )
}

export default Artist
