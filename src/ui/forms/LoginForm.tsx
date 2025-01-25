import { ChangeEvent, FormEvent, useState } from 'react'
import { loginUser } from '../../services/authServices'

import styles from './LoginForm.module.css'

const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    })

    const handleSubmit = async(event: FormEvent<HTMLFormElement> ) :Promise<void> => {

        event.preventDefault()

        try {
            const response : any = await loginUser(formData)

            if(!response.success) {
                alert(response.message)
                console.log(response)
            }

            const { data } = response
            alert(data.message)
            
        } catch (error) {

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
                onChange={handleChange}
                />

                <br />

                <label htmlFor="password">password:</label> <br />
                <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                />
                <br /><br />

                <input type="submit" value="login" />
            </form>
    )
}

export default LoginForm