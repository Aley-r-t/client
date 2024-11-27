import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dasboard from './pages/Dasboard';
import Facturas from './pages/Facturas';
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login setAuthToken={() => {}} />} />
      <Route path="/home" element={<Home />} />
      <Route path='/dasboard' element={<Dasboard  /> }/>
      <Route path='/facturas' element={<Facturas /> }/>
      
    </Routes>
  </Router>
  )
}

export default App
