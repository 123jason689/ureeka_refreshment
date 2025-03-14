
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import { useAuth } from './context/AuthContext';
import NextMenu from "./pages/menu/page"
import ProtectRoute from "./lib/protectRoute";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Login/>}/>
        <Route path='/menu' element={<NextMenu/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
