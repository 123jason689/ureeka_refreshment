
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAuth } from './context/AuthContext';
import NextMenu from "./pages/menu/page"
import Home from "./pages/main/page"
import ProtectRoute from "./lib/protectRoute";
import Navbar from './components/ui/navbar';
import ProviderDashboard from './pages/provider/page';
import Login from './pages/auth/login/page.tsx';
import Register from './pages/auth/register/page.tsx';


function App() {

  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div className="pt-20">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Login />} />
            <Route path='/menu' element={<NextMenu />} />

            <Route path='/dashboard' element={
              <ProtectRoute isAuthenticated={isAuthenticated}>
                <ProviderDashboard page='profile' />
              </ProtectRoute>
            } />
            <Route path='/dashboard/new-menu' element={
              <ProtectRoute isAuthenticated={isAuthenticated}>
                <ProviderDashboard page='newmenu' />
              </ProtectRoute>
            } />
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
