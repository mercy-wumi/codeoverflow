import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGlobeAmericas } from 'react-icons/fa'

const Sidebar = () => {
    const [active, setActive] = useState('questions')
    // const [clicked, setClicked] = useState(false)


    // const menu = [
    //     {
    //         id: 1,
    //         name: 'Questions'
    //     },
    //     {
    //         id: 2,
    //         name: 'Tags'
    //     },
    //     {
    //         id: 3,
    //         name: 'Users'
    //     },
    //     {
    //         id: 4,
    //         name: 'Companies'
    //     },
    // ]

    const handleClick = (activeMenu) => {
        setActive(activeMenu)
    }

    return (
        <div className='sidebar'>
            <nav>
                <div>
                    <span className='public'>Public</span>
                    <ul>
                        <Link to='/'>
                            <li onClick={() => handleClick('questions')} className={active === 'questions' ? 'active' : 'questnMenu'}>
                                <FaGlobeAmericas className='icons' />
                                Questions
                            </li>
                        </Link>
                        <Link to='/tags'>
                            <li className={active === 'tags' ? 'active' : ''} onClick={() => handleClick('tags')}>
                                <span>Tags</span>
                            </li></Link>
                        <Link to='/users'><li className={active === 'users' ? 'active' : ''} onClick={() => handleClick('users')}>
                            <span>Users</span>
                        </li></Link>
                        <Link to='/'><li className={active === 'companies' ? 'active' : ''} onClick={() => handleClick('companies')}>
                            <span>Companies</span>
                        </li></Link>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar