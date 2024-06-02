import * as yup from 'yup';
import { useState } from 'react';
import '../App.css'

const sendFormData = (formData) => {
    console.log(formData)
}

const emailBlurSchema = yup
    .string()
    .required('Поле "Почта" обязательно для заполнения')
    .email('Некорректный формат почты')

const passwordSchema = yup
    .string()
    .required('Поле "Пароль" обязательно для заполнения')
    .matches(/^[\w]*$/, 'Пароль должен содержать только быквы и цифры')
    .max(20, 'Пароль должен быть не больше 20 символов')

const validateAndGetErrorMessage = (schema, value) => {
    let errorMessage = null
    
    try {
        schema.validateSync(value)
    } catch ({ errors }) {
        errorMessage = errors
            .reduce((message, error) => message + error)
            .trim()
    }

    return errorMessage
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
        const newError = validateAndGetErrorMessage(emailBlurSchema, email)
        setEmailError(newError);
    }

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
        
        const newError = validateAndGetErrorMessage(passwordSchema, event.target.value)

        setPasswordError(newError)
    }

    const passwordConfirmOnChange = (event) => {
        setPasswordConfirm(event.target.value)

        const newError = password === event.target.value ? '' : 'Пароли не совпадают'

       setPasswordConfirmError(newError)
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
            placeholder='Подтверждение пароля' 
            name='passwordConfirm' 
            type='password' 
            value={passwordConfirm} 
            onChange={event => passwordConfirmOnChange(event)} 
            />
            <button 
            className='submit'
            type='submit'
            disabled={!email || !password || !passwordConfirm || emailError || passwordError || passwordConfirmError} 
            name='registration' 
            >
            Зарегистрироваться
            </button>
        </form>
    )
}

