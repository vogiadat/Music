import {History} from 'lucide-react'
import {IFavor, IMusic} from '../types/music'
import {useEffect, useState} from 'react'
import {getHistory} from '@/services/history.service'
import {useAppSelector} from '@/app/hook'
import ListMusic from '@/components/Layout/ListMusic'
import {endPoint} from '@/utils/constant'
import {Link} from 'react-router-dom'

const Recent = () => {
    const [history, setHistory] = useState<IMusic[]>([])
    const {user} = useAppSelector((state) => state.auth)

    useEffect(() => {
        getHistory().then((data) => {
            setHistory(data.rows.map((song: IFavor) => song.media))
        })
    }, [])

    if (user) {
        return (
            <>
                {history.length === 0 ?
                    <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                        <div className='grid gap-3 text-center'>
                            <History size={80} className='mx-auto' />
                            <b className='text-4xl font-bold'>Let’s find new song</b>
                            <p className='text-xl'>Save albums by tapping the heart icon</p>
                            <Link
                                to={endPoint.music}
                                className='mx-auto text-center bg-secondary py-2 px-3 rounded-xl hover:opacity-80'
                            >
                                Find Song
                            </Link>
                        </div>
                    </div>
                :   <>
                        <div className='ml-6'>
                            <div>
                                <b className='text-4xl font-extrabold'>History</b>
                            </div>
                            <div className={`w-full h-[850px]`}>
                                <ListMusic listSong={history} />
                            </div>
                        </div>
                    </>
                }
            </>
        )
    } else {
        return (
            <>
                <div className={`w-full h-[850px] overflow-y-scroll flex justify-center items-center`}>
                    <div className='grid gap-3 text-center'>
                        <History size={80} className='mx-auto' />
                        <b className='text-4xl font-bold'>History listened</b>
                        <p className='text-xl'>Need to login to use this</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Recent
