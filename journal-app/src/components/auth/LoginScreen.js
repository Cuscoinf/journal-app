import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const {loading} = useSelector(state => state.ui)

    
    
    const[formValues, handleInputChange] = useForm({
        email: 'cirstiand@gmail.com',
        password: '123456'
    })
    
    const{email, password} = formValues;
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(email,password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <>
        <h3 className="auth__title">Login</h3>
        <form onSubmit={handleSubmit}>
            <input className="auth__input" type="text" value={email} onChange={handleInputChange} placeholder="Email" name="email" autoComplete="off" />
            <input className="auth__input" type="password" value={password} onChange={handleInputChange} placeholder="password" name="password" />
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Login</button>
            <div className="auth__social-networks">
                <p>Login with social network</p>
                <div className="google-btn" onClick={handleGoogleLogin}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>
            <Link to="/auth/register" className="link">Create new account</Link>
        </form>
        </>
    )
}
