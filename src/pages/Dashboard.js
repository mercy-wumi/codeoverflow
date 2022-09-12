import { useEffect, useState } from 'react'
import { useQuestionsContext } from '../hooks/useQuestionsContext'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { useAuthContext } from '../hooks/useAuthContext'


const Dashboard = () => {
    const { questions, dispatch } = useQuestionsContext()
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)

    console.log(questions)

    useEffect(() => {
        const fetchQuestions = async () => {
            const resp = await fetch('https://codeoverflow-app.herokuapp.com/api/questions', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const jsonQuestions = await resp.json()
            if (resp.ok) {
                dispatch({ type: 'GET_QUESTIONS', payload: jsonQuestions })
                setLoading(false)
            }
        }
        if (user) {
            fetchQuestions()
        }

    }, [dispatch, user])



    return (
        <div className='row'>
            <Sidebar />
            {questions && <Main questions={questions} loading={loading} />}
        </div>
    )
}

export default Dashboard