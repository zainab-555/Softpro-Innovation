import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Home from './Home'
import Product from './Product'
import Registering from './registering'
import Admin from './components/Admin'
import RegisterPage from './components/RegisterPage'
import AdminLogin from './components/AdminLogin'
const App = () => {
  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/Product' element={<Product/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
        <Route path='/Registering' element={<Registering/>}></Route>
        <Route path='/adminLogin' element={<AdminLogin/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App