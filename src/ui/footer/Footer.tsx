import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer_container}>
        
        <div>

            © Gamer Cred Inc. 2025
        </div>

        <div className={styles.links_container}>
            <div>
                Instagram
            </div>
            <div>
                Email
            </div>
        </div>
    </div>
  )
}

export default Footer