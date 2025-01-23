import { ChangeEvent, FormEvent, useState } from 'react'
import { loginUser } from '../../services/authServices'

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
        <form onSubmit={handleSubmit}>
            
                <label htmlFor="username">username:</label>
                <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                />
                <label htmlFor="password">password:</label>
                <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                />

                <input type="submit" value="login" />
            </form>
    )
}

export default LoginForm