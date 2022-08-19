import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGlobeAmericas } from 'react-icons/fa'

const Sidebar = () => {
    const [active, setActive] = useState('tags')
    return (
        <div className='sidebar'>
            <nav>
                <div>
                    <span>Public</span>
                    <ul>
                        <li className={active === 'questions' ? 'active' : 'move-left'} onClick={() => setActive('questions')}>
                            <Link to='/'>
                                <FaGlobeAmericas className={active === 'questions' ? 'icons' : 'hide'} />
                                Questions
                            </Link>
                        </li>
                        <li className={active === 'tags' ? 'active' : 'move-left'} onClick={() => setActive('tags')}>
                            <Link to='/'>
                                <FaGlobeAmericas className={active === 'tags' ? 'icons' : 'hide'} />
                                Tags
                            </Link>
                        </li>
                        <li className={active === 'users' ? 'active' : 'move-left'} onClick={() => setActive('users')}>
                            <Link to='/'>
                                <FaGlobeAmericas className={active === 'users' ? 'icons' : 'hide'} />
                                Users
                            </Link>
                        </li>
                        <li className={active === 'companies' ? 'active' : 'move-left'} onClick={() => setActive('companies')}>
                            <Link to='/'>
                                <FaGlobeAmericas className={active === 'companies' ? 'icons' : 'hide'} />
                                Companies
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar