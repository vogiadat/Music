import {Routes, Route} from 'react-router-dom'
import Layout from '@/layouts'
import Home from '@/pages/Home'

const App = () => {
    return (
        <Routes>
            {/* Client */}
            <Route element={<Layout.Client />}>
                <Route path='/' element={<Home />} />
            </Route>
        </Routes>
    )
}

export default App
