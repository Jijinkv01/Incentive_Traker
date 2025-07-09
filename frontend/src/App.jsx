import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Records from './pages/Records'
import PrivateRoute from './route/PrivateRoute'
import PublicRoute from './route/PublicRoute'


const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>}/>
      <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>}/>
      <Route path='/' element={<PrivateRoute> <Home/> </PrivateRoute>  }/>
      <Route path='/recordes' element={<PrivateRoute> <Records/> </PrivateRoute>  }/>
    </Routes>
  )
}

export default App