import { ChangeEvent, FormEvent, useState } from 'react'
import { registerUser } from '../../services/authServices'
import { useLocation } from 'react-router-dom'
import BasicModal from '../modals/BasicModal'

const RegisterForm = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
        username: '',
        password: '' 
  })

  const handleSubmit = async(event: FormEvent<HTMLFormElement> ) :Promise<void>=> {
    event.preventDefault()

    try {
        
        const response = await registerUser(formData)

        if(!response.success) {
            alert('Problem creating account')
        } else {

        }

    } catch (error) {
        console.log(error)
    }

  }
  const handleChange = (event  :ChangeEvent<HTMLInputElement>) :void => setFormData({...formData, [event.target.name] : event.target.value})



  return (
    <>

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

        <input
         type="submit"
         value="Register"
        />

    </form>
    </>
  )
}

export default RegisterForm