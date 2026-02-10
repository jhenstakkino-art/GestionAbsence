import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './contextes/Homepage'

import './App.css'

function App() {
  return (
    <Router>
      <div className="acceuil-page">
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </div>

    </Router>
  )
}

export default App