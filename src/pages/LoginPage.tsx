import LoginForm from '../ui/forms/LoginForm'

import styles from './LoginPage.module.css'

const LoginPage = () => {


  const handleLinkSteam = async() => {

  }
  return (
    <div className={`page_container ${styles.login_page_container}`}>
        
        {/* basic auth */}
        <br /><br /><br /><br /><br />
        <h3>Login</h3>
        <LoginForm />

        OR

        {/* steam */}
        <img
         className={styles.steam_button_img}
         src="/link_steam_button.png"
         alt="link button"
         onClick={handleLinkSteam}
        />


        <br /><br /><br /><br /><br />
    </div>
  )
}

export default LoginPage