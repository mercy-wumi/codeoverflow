import React from 'react'
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
                                <div><FaPen /></div>
                                <span>A history of open-source licensing from a lawyer who helped blaze the trail</span>
                            </li>
                            <li className='list'>
                                <div><FaPen /></div>
                                <span>The last technical interview you'll ever take</span>
                            </li>
                            <li className='list'>
                                <div><FaPen /></div>
                                <span>The last technical interview you'll ever take</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span className='list-head'>Articles Written</span>
                        <ul>
                            <li>
                                <a href='https://dev.to/m_adams1909/data-fetching-with-axios-in-react-made-simple-2jei' className='list'>
                                    <div><MdArticle /></div>
                                    <span>Fectching data using axios in a react application</span>
                                </a>
                            </li>
                            <li>
                                <a href='https://mercyadams.hashnode.dev/getting-started-with-tailwind-css' className='list'>
                                    <div><MdArticle /></div>
                                    <span>Beginners guide to tailwindcss css with practical application example</span>
                                </a>
                            </li>
                            <li>
                                <a href='https://dev.to/m_adams1909/git-for-beginners-4857' className='list'>
                                    <div><MdArticle /></div>
                                    <span>Git and github tutorial for beginners</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RightBar