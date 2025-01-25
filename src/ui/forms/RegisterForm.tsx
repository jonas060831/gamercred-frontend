import { ChangeEvent, FormEvent, useState } from 'react'
// import BasicModal from '../modals/BasicModal'
// import { useLocation, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/authServices'
// import { useLocation } from 'react-router-dom'

const RegisterForm = () => {

  
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
            
            console.log(response)
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