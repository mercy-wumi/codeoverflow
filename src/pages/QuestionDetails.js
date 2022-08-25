import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionsContext } from '../hooks/useQuestionsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Details from '../components/Details'
import Sidebar from '../components/Sidebar'

const QuestionDetails = () => {
    const { id } = useParams()
    const { question, dispatch } = useQuestionsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchQuestion = async (id) => {
            const resp = await fetch('/api/questions/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const jsonQuestn = await resp.json()
            console.log(jsonQuestn)
            if (resp.ok) {
                dispatch({ type: 'GET_QUESTION', payload: jsonQuestn })
            }
        }
        if (user) {
            fetchQuestion(id)
        }
    }, [dispatch, user, id])

    return (
        <div className='row'>
            <Sidebar />
            {question && <Details question={question} id={id} />}
        </div>
    )
}

export default QuestionDetails