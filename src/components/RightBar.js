import React from 'react'
import { Link } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import { MdArticle } from 'react-icons/md'

const RightBar = () => {
    return (
        <div className='right'>
            <div>
                <ul>
                    <li>
                        <span className='list-head round'>The Overflow Blog</span>
                        <ul>
                            <li className='list'>
                                <FaPen />
                                <span>A history of open-source licensing from a lawyer who helped blaze the trail</span>
                            </li>
                            <li className='list'>
                                <FaPen />
                                <span>The last technical interview you'll ever take</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span className='list-head'>Articles Written</span>
                        <ul>
                            <li>
                                <Link to='/' className='list'>
                                    <MdArticle />
                                    <span>Fectching data using axios in a react application</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='list'>
                                    <MdArticle />
                                    <span>Beginners guide to tailwindcss css with practical application example</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='list'>
                                    <MdArticle />
                                    <span>Git and github tutorial for beginners</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RightBar