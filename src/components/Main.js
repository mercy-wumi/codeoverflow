import React from 'react'
import { Link } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import { MdArticle } from 'react-icons/md'
import { useAuthContext } from '../hooks/useAuthContext'

const Main = ({ questions }) => {
    const { user } = useAuthContext()
    return (
        <div className='main'>
            <div className='left'>
                <div className='top-header'>
                    <div className='heading'>
                        <h4>All Questions</h4>
                        <Link to='/askquestion'>
                            <button>Ask Question</button>
                        </Link>
                    </div>
                    <span>{questions.length} questions</span>
                </div>
                <div>
                    {questions && questions.map((question, index) => (
                        <div key={index} className='questions-link'>
                            <Link to=''>{question.title}</Link>
                            <p>{question.description}</p>
                            <div className='tags-sec'>
                                <div>
                                    {question.tags.map((tag, index) => (
                                        <button key={index} className='tags'>{tag.text}</button>
                                    ))}
                                </div>
                                <div>
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
        </div>
    )
}

export default Main