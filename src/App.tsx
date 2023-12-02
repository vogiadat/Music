//import {lazy} from 'react'
import {Routes, Route} from 'react-router-dom'
import Layout from '@/layouts'

//const Home = lazy(() => import('@/pages/Home'))
import Favourite from '@/pages/Favourite'
import Recent from '@/pages/Recent'
import Download from '@/pages/Download'
import Upload from '@/pages/Upload'
import Albums from '@/pages/Albums'
import Home from '@/pages/Home'

const App = () => {
    return (
        <Routes>
            {/* Client */}
            <Route element={<Layout.Client />}>
                <Route path='/' element={<Home />} />
                <Route path='/favourite' element={<Favourite />} />
                <Route path='/recent' element={<Recent />} />
                <Route path='/albums' element={<Albums />} />
                <Route path='/download' element={<Download />} />
                <Route path='/upload' element={<Upload />} />
            </Route>
        </Routes>
    )
}

export default App
