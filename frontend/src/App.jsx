import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/explore' element={<ExplorePage/>}/>
        </Routes>
    </Router>
  )
}

export default App
