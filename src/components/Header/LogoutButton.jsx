import React from 'react'
import { useDispatch } from 'react-redux'
import ConfigurationService from '../../appwrite/Auth'
import {logout as logoutAction} from '../../store/AuthSlice'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = async () => {
        try{
          await ConfigurationService.logout();
        }catch(error){
          console.log(error.message)
        }finally{
          dispatch(logoutAction())
          navigate('/login')
        }
    }

  return (
    <button 
    onClick={logoutHandler}
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-medium text-lg'>
        Logout</button>
  )
}

export default LogoutButton