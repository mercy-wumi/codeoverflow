import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RightBar from './RightBar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useQuestionsContext } from '../hooks/useQuestionsContext'


const Details = ({ question, id }) => {
    const [answer, setAnswer] = useState('')
    const [answers, setAnswers] = useState(question?.answers)
    const [error, setError] = useState(null)

    const { dispatch } = useQuestionsContext()
    const { user } = useAuthContext()

    const navigate = useNavigate()
    const handleAskQuestion = () => {
        navigate('/askquestion', { replace: true })
    }

    const postAnswer = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged In')
            return
        }
        console.log(user)
        const questnAnswer = `${user.username}: ${answer}`
        const resp = await fetch(`/api/questions/${id}/postAnswer`, {
            method: 'POST',
            body: JSON.stringify(questnAnswer),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const questnAnswerJson = await resp.json()
        if (!resp.ok) {
            setError(questnAnswerJson.error)
            console.log(error)
        }
        if (resp.ok) {
            console.log('answer submitted', questnAnswerJson)
            dispatch({ type: 'POST_ANSWER', payload: questnAnswerJson })
            return questnAnswerJson.answers
        }
        setAnswer('')
        setError(null)
        setAnswers(questnAnswerJson)
    }
    return (
        <div className='details'>
            <div className='top-header border'>
                <div className='heading'>
                    <h4>How to get current user data from firestore?</h4>
                    <button onClick={handleAskQuestion}>Ask Question</button>
                </div>
                <span>4 questions</span>
            </div>
            <div className='detail-main'>
                <div className='left'>
                    {question.description}
                    {answers && answers.map(answer => {
                        return (
                            <p>
                                <strong>{answer.split(': ')[0]}</strong>
                                {answer.split(':')[1]}
                            </p>
                        )
                    })}
                    <form onSubmit={postAnswer}>
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