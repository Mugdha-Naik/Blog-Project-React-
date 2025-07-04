import React from 'react'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutButton from './LogoutButton'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    //(to check the status of the user)

    const navigate = useNavigate();
    //(just how we use dispatch)

    //when we use navigate we need to make arrays (navItems)
    const navItems=[
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'AllPost',
            slug: '/all-post',
            active: authStatus,
        },
        {
            name: 'AddPost',
            slug: '/add-post',
            active: authStatus,
        },
    ]

    

  return (
    <header className=' py-3 shadow bg-gray-500 '>
        <Container>
            <nav className='flex'>
                <div className='mr-4 '>
                    <Link to='/'>
                        <Logo width='70px'/>
                    </Link>
                </div>

                <ul className='flex ml-auto'>
                    {navItems.map((item) => 
                    item.active ? (
                        <li key={item.name}>
                            <Link
                                to={item.slug}
                                className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ) : null
                    )}
                    {authStatus && (
                        <li>
                            <LogoutButton/>
                        </li>
                    )}

                    {/* agar authstatus true hoga tab hi ye true hoga
                    matlab agar authenticated user ho toh hi logout kar sakte ho
                    warna nahi kar sakte ho  */}
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header