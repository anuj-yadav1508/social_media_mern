import React, { useRef } from 'react'
import './login.css'
import axios from 'axios'
import { useGlobalContext } from '../../context/AuthContext'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const {user, isFetching, isError, dispatch} = useGlobalContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        const loginCall = async (userCredentials, dispatch) =>{
            dispatch({ type: "LOGIN_START" })
            try {
                const res = await axios.post('auth/login', userCredentials)
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data})
            } catch (err) {
                dispatch({ type: 'LOGIN_FAILURE', payload: err})
            }
        }

        loginCall({email: emailRef.current.value, password: passwordRef.current.value},dispatch)
    }

    console.log(user)
    return (
        <section className='login-section'>
            <div className="login-left">
                <div className="login-left-info">
                    <h1 className="login-left-title">GoSocial</h1>
                <h2 className="login-left-moto">Come and connect with the people across the World!</h2>
                </div>
            </div>

            <div className="login-right">
                <h2 className="login-form-heading">LogIn </h2>
                <br />
                <form  className="login-form" onSubmit={handleSubmit}>
                    
                    <input type="email" className="login-form-input" name='email' placeholder='Email:' ref={emailRef} required/>
                    <br />
                    <input type="password" className="login-form-input" name='password' placeholder='Password:' ref={passwordRef} required minLength='6'/>
                    <br />
                    
                    <br /><br />
                    <button className='login-button' type='submit'>Login</button>
                </form>

                <p>Don't have an account?<span className="p-link"><a href="/register">Register</a></span></p>
            </div>
        </section>
    )
}


export default Login