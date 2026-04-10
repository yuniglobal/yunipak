// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/Aboutus'
import './styles.css'

function App() {
  const location = useLocation();
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* Only show footer on home page */}
      {location.pathname === '/' && <Footer />}
    </div>
  )
}

export default App