import {List} from '@/components/Client/Category'
import {getAllCategory} from '@/services/category.service'
import {IAlbum} from '@/types/music'
import {useEffect, useState} from 'react'

const Category = () => {
    const [list, setList] = useState<IAlbum[]>([])
    useEffect(() => {
        const getData = async () => {
            const res = await getAllCategory()
            return setList(res.element.rows)
        }
        getData()
    }, [])

    return (
        <>
            <List title='Thể Loại' list={list} />
        </>
    )
}

export default Category
