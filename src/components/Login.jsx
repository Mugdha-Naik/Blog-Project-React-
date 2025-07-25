import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/AuthSlice'
import Input from './Input'
import Button from './Button'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import ConfigurationService from '../appwrite/Auth'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        //always set errors as empty when creating login

        try{
            // Check if a session already exists
            const currentUser = await ConfigurationService.getCurrUser()
            if (currentUser) {
                // Optionally, log out the current session
                await ConfigurationService.logout()
            }

            const session = await ConfigurationService.login(data)
            console.log("session: ", session)
            if(session){
                const userData = await ConfigurationService.getCurrUser()
                console.log("UserData:", userData);
                if(userData){
                    dispatch(authLogin(userData));
                    navigate("/")
                    console.log("Navigated to /");
                }else{
                    console.log("error")
                }
            }
        }catch(error){
            setError(error.message)
            console.error("Login error:", error);
        }
    }

  return (
    <div className='flex items-center justify-center w-full '>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                <Link 
                to="/signup"
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
            {error}</p> }

            {/* the above syntax will display any error if exists */}

            <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                        {/* its compulsory to spread register when using useForm because 
                        if we use registers in any other file also its values may override 
                        with each other */}

                        {/* after spreading register we write first thing as key(email) others as objects */}

                        <Input
                        label="Password"
                        type='password'
                        placeholder="Enter your password"
                        {...register("password",{
                            required: true,
                        })}
                        />

                        <Button
                        type="submit"
                        className="w-full">Sign in</Button>
                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

//we use register because then we dont have to manage each state of user 