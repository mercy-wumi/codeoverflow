import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import { useAuthContext } from '../hooks/useAuthContext'
import { formatDistanceToNow } from 'date-fns'
import RightBar from './RightBar'


const Main = ({ questions, loading }) => {
    const navigate = useNavigate()

    // const { user } = useAuthContext()

    const handleAskQuestion = () => {
        navigate('/askquestion', { replace: true })
    }

    return (
        loading ? <span className='loading'>Loading...</span> :
            <div className='main'>
                <div className='left'>
                    <div className='top-header'>
                        <div className='heading'>
                            <h4>All Questions</h4>
                            <button onClick={handleAskQuestion}>Ask Question</button>
                        </div>
                        <span>{questions.length} questions</span>
                    </div>
                    <div>
                        {questions && questions.map((question, index) => (
                            <div key={index} className='questions-link'>
                                <Link to={`/${question._id}`}>{question.title}</Link>
                                <p>{question.description.length > 200 ? question.description.slice(0, 200) + ' ...' : question.description}</p>
                                <div className='tags-sec'>
                                    <div>
                                        {question.tags.map((tag, index) => (
                                            <button key={index} className='tags'>{tag}</button>
                                        ))}
                                    </div>
                                    <div className='time'>
                                        <span>{question.postedBy.username}</span>
                                        <span>{formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <RightBar />
            </div>
    )
}

export default Main