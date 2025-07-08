import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import {login, logout} from './store/AuthSlice'
import ConfigurationService from './appwrite/Auth'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import blog3 from './photos/blog3.jpg'


const App = () => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    ConfigurationService.getCurrUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .catch(() => {
      dispatch(logout());
    })
    .finally(()=> setLoading(false))
  }, [])
  

  console.log(import.meta.env.VITE_APPWRITE_URL)
  //here the .env variables file is being accessed
  //sometimes app.jsx may crash so we create a config.js to store this

  if (loading) return <div>Loading...</div>;

  return !loading ? (
    <div className='min-h-screen bg-gray-400 flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header/>
        <main>
          
          <Outlet />
        </main>

        <img src={blog3} alt="blog" className=" justify-center items-center w-full" />
        <Footer/>
      </div>
    </div>
  ) : null
}

//improvise this later
export default App