import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './contextes/Homepage'
import UserLogin from './contextes/login'
import UserRegister from './contextes/register'
import DashboardPage from './contextes/dashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="acceuil-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/register' element={<UserRegister/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          
        </Routes>
      </div>

    </Router>
  )
}

export default App