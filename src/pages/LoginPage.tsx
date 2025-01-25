import { useState } from 'react'
import LoginForm from '../ui/forms/LoginForm'
import BasicModal from '../ui/modals/BasicModal'

import { Modal } from 'bootstrap'

import styles from './LoginPage.module.css'
import ButtonLink from '../ui/button-link/ButtonLink'


const LoginPage = () => {
  const [serverMessage, setServerMessage] = useState<string>('')

  const handleLinkSteam = async() => {

    //TODO missing or incorrect process 
    window.location.href = `${import.meta.env.VITE_BACKEND_SERVER}/link-steam/`

    // const response = await fetch(`${BASE_URL}/link-steam/`)

    // const data = await response.json()

    // window.location.href = data.redirect_url


  }

  const handleError = (error: any) => {
    setServerMessage(error.message)

    const loginErrorModal:any = document.getElementById('login_error')

    const boostrapModal = new Modal(loginErrorModal)

    boostrapModal.show()
  }

  return (
    <div className={`page_container ${styles.login_page_container}`}>
        
        {/* basic auth */}
        <br /><br /><br /><br /><br />
        <h3>Login</h3>
        <LoginForm
         handleError={handleError}
        />

        {/* steam */}
        <img
         className={styles.steam_button_img}
         src="/link_steam_button.png"
         alt="link button"
         onClick={handleLinkSteam}
        />

        or

        <ButtonLink
         title='Create an Account'
         to='/register'
        />
        <br /><br /><br /><br /><br /><br />

        <BasicModal
         title='Login Error'
         body={<><h3>{serverMessage}</h3></>}
         modalId='login_error'
        />
    </div>
  )
}

export default LoginPage