import { useEffect } from 'react'
import { useQuestionsContext } from '../hooks/useQuestionsContext'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { useAuthContext } from '../hooks/useAuthContext'


const Dashboard = () => {
    const { questions, dispatch } = useQuestionsContext()
    const { user } = useAuthContext()

    console.log(questions)

    useEffect(() => {
        const fetchQuestions = async () => {
            const resp = await fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const jsonQuestions = await resp.json()
            if (resp.ok) {
                dispatch({ type: 'GET_QUESTIONS', payload: jsonQuestions })
            }
        }
        if (user) {
            fetchQuestions()
        }

    }, [dispatch, user])



    return (
        <div className='row'>
            <Sidebar />
            {questions && <Main questions={questions} />}
        </div>
    )
}

export default Dashboard