import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    
    const {msgError} = useSelector(state => state.ui);

    const[valueForm, handleInputChange] = useForm({
        name:'Cristiand',
        email: 'Cristiand@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const {name, email, password, password2} = valueForm;

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid())
        {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = ()=>{
        if(name.trim().length===0){
            dispatch(setError('Name is required!'))
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'))
            return false;
        }else if(password!==password2 || password.length < 5){
            dispatch(setError('password should be at least 6 characters'))
            return false;
        }
        dispatch(removeError);
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError && (
                    <div className="auth__alert-error">{msgError}</div>
                    )
                }
                <input className="auth__input" type="text" value={name} onChange={handleInputChange} placeholder="Name" name="name" autoComplete="off" />
                <input className="auth__input" type="text" value={email} onChange={handleInputChange} placeholder="Email" name="email" autoComplete="off" />
                <input className="auth__input" type="password" value={password} onChange={handleInputChange} placeholder="password" name="password" />
                <input className="auth__input" type="password" value={password2} onChange={handleInputChange} placeholder="Confirm password" name="password2" />
                <button type="submit" className="btn btn-primary btn-block mb-5">Register</button>
                
                <Link to="/auth/login" className="link mt-5">Already register?</Link>
            </form>
        </>
    )
}
