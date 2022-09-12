import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, password) => {
        setError(null)
        setIsLoading(true)

        const resp = await fetch('https://codeoverflow-app.herokuapp.com/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })

        const userJson = await resp.json()
        if (!resp.ok) {
            setIsLoading(false)
            setError(userJson.error)
        }
        if (resp.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(userJson))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: userJson })

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}