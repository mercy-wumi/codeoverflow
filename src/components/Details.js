import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RightBar from './RightBar'
import { formatDistanceToNow } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'
import { useQuestionsContext } from '../hooks/useQuestionsContext'


const Details = ({ question, id }) => {
    const [answer, setAnswer] = useState('')
    // const [answers, setAnswers] = useState(question?.answers)
    const [error, setError] = useState(null)

    const { dispatch } = useQuestionsContext()
    const { user } = useAuthContext()

    const navigate = useNavigate()

    const handleAskQuestion = () => {
        navigate('/askquestion', { replace: true })
    }
    // console.log(answer)

    const postAnswer = async (text, postId) => {
        // e.preventDefault()
        if (!user) {
            setError('You must be logged In')
            return
        }
        // const questnAnswer = `${user.username}: ${answer}`
        const resp = await fetch(`/api/questions/${id}/postAnswer`, {
            method: 'POST',
            body: JSON.stringify({
                postId,
                text
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const answerJson = await resp.json()


        if (!resp.ok) {
            setError(answerJson.error)
            console.log(error)
        }
        if (resp.ok) {
            console.log('answer submitted', answerJson)
            console.log(dispatch({ type: 'POST_ANSWER', payload: answerJson }))
            // return answerJson.answers
            setAnswer('')
            setError(null)
            // setAnswers(answerJson)
        }
    }

    return (
        <div className='details'>
            <div className='top-header border'>
                <div className='heading'>
                    <h4>{question.title}</h4>
                    <button onClick={handleAskQuestion}>Ask Question</button>
                </div>
            </div>
            <div className='detail-main'>
                <div className='left'>
                    <span>{question.description}</span>
                    <img src={question.selectedImage} className='question-img' />
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
                    <div>
                        <p style={{ fontWeight: '600' }}>{question.answers.length} Answer</p>
                        {question.answers.map(answer => (
                            <div key={answer._id}>
                                <span>{answer.text}</span>
                                <span className='answerBy'>answered by: {answer.postedBy.username}</span>
                            </div>
                        )
                        )}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); postAnswer(answer, id) }}>
                        <div className='fillquestion'>
                            <label>Your Answer</label>
                            <textarea
                                rows='12'
                                onChange={e => setAnswer(e.target.value)}
                                value={answer}
                            // className={emptyFields.includes('description') ? 'error' : ''}
                            >
                            </textarea>
                        </div>
                        <button className='button'>Post Answer</button>
                        {/* {error && <div className='error'>{error}</div>} */}
                    </form>
                </div>
                <RightBar />
            </div>
        </div>
    )
}

export default Details