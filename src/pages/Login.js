import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { BiHide, BiShow } from 'react-icons/bi'

const Login = () => {

    const { login, error, isLoading } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email Address:</label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label className='showpass'>Password:
                {showPass ? <BiShow onClick={() => setShowPass(!showPass)} /> : <BiHide onClick={() => setShowPass(!showPass)} />}
            </label>
            <input
                type={showPass ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login