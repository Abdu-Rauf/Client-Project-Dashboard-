import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.tsx'
import Login from './auth/Login.tsx'
import Register from './auth/Register.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
