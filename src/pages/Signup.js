import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { BiHide, BiShow } from 'react-icons/bi'

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password)
    }

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>Username:</label>
            <input
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
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
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup