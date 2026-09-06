import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import About from './Components/About'
import Blog from './Components/Blog'
import Contact from './Components/Contact'
import Gallery from './Components/Gallery'
import Room from './Components/Room'
import Header from './Components/Header'
import Footer from './Components/Footer'


export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/Register'element={<Register/>} />
        <Route path='/Login'element={<Login/>} />
        <Route path='/Home'element={<Home/>} />
        <Route path='/About'element={<About/>} />
        <Route path='/Blog'element={<Blog/>} />
        <Route path='/Contact'element={<Contact/>} />
        <Route path='/Gallery'element={<Gallery/>} />
        <Route path='/Room'element={<Room/>} />
      </Routes>  
      <Footer/>
      </BrowserRouter>
    </div>
  )
}
