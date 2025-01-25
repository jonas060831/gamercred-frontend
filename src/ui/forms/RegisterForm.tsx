import { ChangeEvent, FormEvent, useState } from 'react'
import BasicModal from '../modals/BasicModal'
import { NavLink, replace, useNavigate, useSearchParams } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BACKEND_SERVER
const RegisterForm = () => {
  //const location = useLocation()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
        username: '',
        password: '' 
  })

  const handleSubmit = async(event: FormEvent<HTMLFormElement> ) :Promise<void>=> {
    event.preventDefault()

    // try {
        
    //     const response = await registerUser(formData)

    //     if(!response.success) {
    //         alert('Problem creating account')
    //     } else {
    //         const response = await initiateSteamLink()

    //         console.log(response)
    //     }

    // } catch (error) {
    //     console.log(error)
    // }
  }

  const handleLinkSteam = async ()=> {
    try {
        
        window.location.href = `${BASE_URL}/link-steam/`

        
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
         data-bs-toggle="modal"
         data-bs-target="#link_profile"

        />

    </form>

    <BasicModal
     title='Link'
     body={<>
     
        <button onClick={handleLinkSteam}><img src="/link_steam_button.png" alt="link button" /></button>
    </>}
     modalId='link_profile'
    />

    </>
  )
}

export default RegisterForm