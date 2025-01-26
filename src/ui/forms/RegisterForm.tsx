import { ChangeEvent, FormEvent, useState } from 'react'
import { registerUser } from '../../services/authServices'

import { Modal } from "bootstrap" 

import styles from './RegisterForm.module.css'

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
            
            const profile = response.data
            
            localStorage.setItem("user", JSON.stringify(profile))

            //toggle modal
            const connectWith3rdParty:any = document.getElementById('connect3rdParty')
            const boostrapModal = new Modal(connectWith3rdParty)
            boostrapModal.show()
        }

    } catch (error) {
        console.log(error)
    }
  }

  const handleChange = (event  :ChangeEvent<HTMLInputElement>) :void => setFormData({...formData, [event.target.name] : event.target.value})

  return (
    <div className={styles.register_form_container}>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>

          <label htmlFor="username">username:</label>
          <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          required
          />
          <label htmlFor="password">password:</label>
          <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          required
          />
          <br />
          <input
          type="submit"
          value="Register"
          />

          
      </form>
    </div>
  )
}

export default RegisterForm