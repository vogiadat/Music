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
import Category from './pages/Category'

import {Single as SingleArtist} from './components/Client/Artist'
import {Single as SingleAlbum} from './components/Client/Albums'
import {Single as SingleCategory} from './components/Client/Category'
import {Single as SinglePlayList} from './components/Client/PlayList'
import MyPlaylist from './pages/MyPlaylist'
import Notfound from './pages/Notfound'

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
                <Route path='category'>
                    <Route path='' element={<Category />} />
                    <Route path=':id' element={<SingleCategory />} />
                </Route>
                <Route path='playlist'>
                    <Route path=':id' element={<SinglePlayList />} />
                    <Route path='my-list' element={<MyPlaylist />} />
                </Route>
                {/* Single */}
                <Route path='*' element={<Notfound />} />
            </Route>
        </Routes>
    )
}

export default App
