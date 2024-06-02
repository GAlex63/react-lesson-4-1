import { useForm } from "react-hook-form";
import '../App.css'

const sendFormData = (formData) => {
    console.log(formData)
}

export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        }
    })

    const emailProps = {
        required: true,
        pattern: {
            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            message: 'Некорректный формат почты'
        }
    }

    const emailError = errors.email?.message

    const passwordProps = {
        required: true,
        maxLength: { value: 20, message: 'Пароль должен быть не больше 20 символов' },
        pattern: {
            value: /^[\w]*$/,
            message: 'Пароль должен содержать только буквы и цифры'
        },
    }

    const passwordError = errors.password?.message

    const passwordConfirmProps = {
        required: true,
        validate: (value) => {
            if (watch('password') != value) {
                return 'Пароли не совпадают'
            }
        }
    }

    const passwordConfirmError = errors.passwordConfirm?.message

    return(
        <form className='form' onSubmit={handleSubmit(sendFormData)}>
            <h2>Регистрационная форма</h2>
            {emailError && <div style={{color: 'red'}}>{emailError}</div>} 
            <input 
            className='input'
            placeholder='Почта'
            name='email' 
            type='email' 
            {...register('email', emailProps)}
            />
            {passwordError && <div style={{color: 'red'}}>{passwordError}</div>}
            <input
            className='input'
            placeholder='Пароль'
            name='password' 
            type='password' 
            {...register('password', passwordProps)} 
            />
            {passwordConfirmError && <div style={{color: 'red'}}>{passwordConfirmError}</div>}
            <input
            className='input'
            placeholder='Повторите пароль' 
            name='passwordConfirm' 
            type='password' 
            {...register('passwordConfirm', passwordConfirmProps)} 
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