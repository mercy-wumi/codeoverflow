import { createContext, useReducer } from 'react'

export const QuestionsContext = createContext()
export const questionsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return {
                ...state,
                questions: action.payload
            }
        case 'ASK_QUESTION':
            return {
                ...state,
                questions: [action.payload, ...state.questions]
            }
        case 'GET_QUESTION':
            return {
                ...state,
                question: action.payload
            }
        case 'POST_ANSWER':
            // return {
            //     ...state,
            //     questions: state.questions.map((question) => {
            //         if (question._id === action.payload._id) {
            //             return action.payload;
            //         }
            //         return question;
            //     }),
            // };
            return {
                ...state,
                question: action.payload
            }
        default:
            return state
    }
}

export const QuestionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(questionsReducer, {
        questions: [],
        question: null
    })

    return (
        <QuestionsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </QuestionsContext.Provider>
    )
}