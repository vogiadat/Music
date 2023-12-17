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
import Music from '@/pages/Music'
import Artist from '@/pages/Artist'
import Trend from '@/pages/Trend'

import SingleArtist from './components/Client/SingleArtist'
import SingleAlbum from './components/Client/SingleAlbum'

const App = () => {
    return (
        <Routes>
            {/* Client */}
            <Route path='/' element={<Layout.Client />}>
                {/* Sidebar */}
                <Route path='' element={<Home />} />
                <Route path='favourite' element={<Favourite />} />
                <Route path='recent' element={<Recent />} />
                <Route path='album'>
                    <Route path='' element={<Albums />} />
                    <Route path=':id' element={<SingleAlbum />} />
                </Route>
                <Route path='download' element={<Download />} />
                <Route path='upload' element={<Upload />} />

                {/* Navbar */}
                <Route path='music' element={<Music />} />
                <Route path='artist'>
                    <Route path='' element={<Artist />} />
                    <Route path=':id' element={<SingleArtist />} />
                </Route>
                <Route path='trend' element={<Trend />} />

                {/* Single */}
            </Route>
        </Routes>
    )
}

export default App
