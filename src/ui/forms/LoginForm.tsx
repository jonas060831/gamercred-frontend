import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { loginUser } from '../../services/authServices'

import styles from './LoginForm.module.css'
import { useNavigate } from 'react-router-dom'


type LoginFormProps = {
    handleError: Function
}

const LoginForm:FC<LoginFormProps> = ({ handleError }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    })

    const handleSubmit = async(event: FormEvent<HTMLFormElement> ) :Promise<void> => {

        event.preventDefault()

        try {
            const response = await loginUser(formData)

            if(!response.success) handleError(response)

            const { data } = response

            console.log(data)

            //add the login user info to local storage
            localStorage.setItem("user", JSON.stringify(data.user))

            console.log(data.user)

            alert(data.message)

            //for now go to profile
            navigate('/profile')
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event  :ChangeEvent<HTMLInputElement>) :void => setFormData({...formData, [event.target.name] : event.target.value})

    return (
        <form className={styles.login_form} onSubmit={handleSubmit}>
            
                <label htmlFor="username">username:</label> <br />
                <input
                type="text"
                name="username"
                id="username"
                required
                onChange={handleChange}
                />

                <br />

                <label htmlFor="password">password:</label> <br />
                <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
                />
                <br /><br />

                <input type="submit" value="login" />
            </form>
    )
}

export default LoginForm