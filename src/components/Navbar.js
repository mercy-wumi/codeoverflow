import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <div className='logo'><Link to='/'>CodeOverFlow</Link></div>
                <nav className='navbar'>
                    <ul>
                        <li>About</li>
                        <li>Products</li>
                        <li>For Teams</li>
                    </ul>
                    <form>
                        <input type='search' placeholder=' Search..' className='searchbar' />
                    </form>
                    {user && (
                        <div className='user-details'>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div className='btn'>
                            <Link to='/login' className='login-btn'>Log in</Link>
                            <Link to='/signup' className='signup-btn'>Sign up</Link>
                        </div>
                    )}

                </nav>
            </div>
        </header>
    )
}

export default Navbar