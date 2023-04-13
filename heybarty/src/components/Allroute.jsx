import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import SingleDrink from './SingleDrink'
import Private from './Private'
import Adminpanel from './Admin/Adminpanel'
import Addcocktail from './Admin/Addcocktail'

const Allroute = () => {
  return (
    <div>
        <Routes>
             <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/:id' element={<SingleDrink/>}/>

            <Route path='/admin' element={<Private><Adminpanel/></Private>}/>
            <Route path='/addcocktail' element={<Private><Addcocktail/></Private>}/>
        </Routes>
    </div>
  )
}

export default Allroute