import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Watch from './pages/Watch'
import Search from './pages/Search'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Search' element={<Search />}/>
        <Route path='/watch/:id' element={<Watch />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App