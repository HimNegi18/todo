import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import checkAuth from '../../utils/auth';

const ProtectedRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    useEffect(() => {
      const verifyAuth =async()=>{
        try {
          const user = await checkAuth();
        setIsAuthenticated(!!user);// using !! to convert to boolean value;
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
        }
        finally{
          setLoading(false);
        }
        
      }
      verifyAuth();
      
      
    }, [])

    if ( loading ) {
      return <div>
        Authenticating
      </div>
    }
    
  return (
    isAuthenticated ? children : <Navigate to='/signin'/>
  )
}

export default ProtectedRoute