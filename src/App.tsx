
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import { useAuth } from './context/AuthContext';
import NextMenu from "./pages/menu/page"
import Home from "./pages/main/page"
import ProtectRoute from "./lib/protectRoute";
import Navbar from './components/ui/navbar';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="pt-20">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Login/>}/>
          <Route path='/menu' element={<NextMenu/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
