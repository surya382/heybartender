import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext'

const Private = ({children}) => {
 
const {authstate}=useContext(Authcontext);

if(!authstate.admin){
    return <Navigate to="/"/>
}

return children;
}

export default Private