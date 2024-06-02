import { useState } from 'react'
import '../App.css'

const sendFormData = (formData) => {
    console.log(formData)
}

export default function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')


    const emailOnChange = (event) => {
        setEmail(event.target.value)
    }

    const emailOnBlur = () => {
        const emailValid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        if (!emailValid.test(String(email).toLowerCase())) {
            setEmailError('Некорректный формат почты')
        } else {
            setEmailError(null)
        }
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
        const passwordValid = /^[\w]*$/
        if (!passwordValid.test(String(event.target.value))) {
            setPasswordError('Пароль должен содержать только быквы и цифры')
        } else if (event.target.value.length > 20) {
            setPasswordError('Пароль должен быть не больше 20 символов')
        } else {
            setPasswordError(null)
        }
    }
    const passwordConfirmOnChange = (event) => {
        setPasswordConfirm(event.target.value)
        if (event.target.value !== password) {
            setPasswordConfirmError('Пароли не совпадают')
        } else {
            setPasswordConfirmError(null)
        }
    }
    const onSubmit = (event) => {
        event.preventDefault()
        sendFormData({ email, password, passwordConfirm})
    }

    return(
        <form className='form' onSubmit={onSubmit}>
            <h2>Регистрационная форма</h2>
            {emailError && <div style={{color: 'red'}}>{emailError}</div>} 
            <input 
            className='input'
            placeholder='Почта'
            name='email' 
            type='email' 
            value={email} 
            onChange={event => emailOnChange(event)} 
            onBlur={emailOnBlur}
            />
            {passwordError && <div style={{color: 'red'}}>{passwordError}</div>}
            <input
            className='input'
            placeholder='Пароль'
            name='password' 
            type='password' 
            value={password} 
            onChange={event => passwordOnChange(event)} 
            />
            {passwordConfirmError && <div style={{color: 'red'}}>{passwordConfirmError}</div>}
            <input
            className='input'
            placeholder='Повторите пароль' 
            name='passwordConfirm' 
            type='password' 
            value={passwordConfirm} 
            onChange={event => passwordConfirmOnChange(event)} 
            />
            <button 
            className='submit'
            type='submit'
            disabled={emailError || passwordError || passwordConfirmError} 
            name='registration' 
            >
            Зарегистрироваться
            </button>
        </form>
    )
}