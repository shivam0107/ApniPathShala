import React from 'react'
import toast from 'react-hot-toast';
import {  useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { token } = useSelector((state) => state.auth);
    
    function error() {
         toast.error("Please Login First");
    }

 if (token !== null) {
   return children;
 } else {
     return (
       <>
        error();
         <Navigate to="/login" />
       </>
     );
 }
}

export default PrivateRoute