import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer_container}>
        
        <div className={styles.top_content}>
            
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/report-form">Report Form</NavLink>
            <NavLink to="/aboutus">About Us</NavLink>
        </div>
        
        <div className={styles.bottom_content}>

            <span>© Gamer Cred Inc. 2025</span>

            <div className={styles.links_container}>
                <div>
                    <a href='https://discord.gg/at89vhZRmn' target='_blank' rel='noopener noreferrer'><i class="fa-brands fa-discord"></i> Join Our Discord</a>
                </div>
                <div>
                <i class="fa-brands fa-instagram"></i> Instagram
                </div>
                <div>
                    <a href="mailto:.com">Send email</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer