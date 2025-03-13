
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='home' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
