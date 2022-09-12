import { useAuthContext } from "./useAuthContext"
import { Navigate } from 'react-router-dom'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        // remove user form storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
        <Navigate to='/login' />
    }

    return { logout }
}