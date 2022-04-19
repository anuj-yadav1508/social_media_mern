import React,{ useRef } from 'react'
import './register.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {

    const history = useHistory()

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordAgainRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(passwordRef.current.value !== passwordAgainRef.current.value){
            passwordAgainRef.current.setCustomValidity('Passwords dont matched!')
        }else{
            const user = {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }

            try {
                await axios.post('auth/register', user)
                history.push('/login')
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <section className='register-section'>
            <div className="register-left">
                <div className="register-left-info">
                    <h1 className="register-left-title">GoSocial</h1>
                <h2 className="register-left-moto">Come and connect with the people across the World!</h2>
                </div>
            </div>

            <div className="register-right">
                <h2 className="register-form-heading">Register </h2>
                <br />
                <form  className="register-form" onSubmit={handleSubmit}>
                    <input type="text" className="register-form-input" name='username' placeholder='Username:' ref={usernameRef}/>
                    <br />
                    <input type="email" className="register-form-input" name='email' placeholder='Email:' ref={emailRef}/>
                    <br />
                    <input type="password" className="register-form-input" name='password' placeholder='Password:' ref={passwordRef}/>
                    <br />
                    <input type="password" className="register-form-input" name='passwordAgain' placeholder='Confirm Password:' ref={passwordAgainRef}/>
                    <br /><br />
                    <button className='register-button' type='submit'>Register</button>
                </form>

                <p>Already have an account?<span className="p-link"><a href="/login">Login</a></span></p>
            </div>
        </section>
    )
}

export default Register
