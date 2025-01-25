import { useNavigate } from "react-router-dom"
import RegisterForm from "../ui/forms/RegisterForm"
import BasicModal from "../ui/modals/BasicModal"

import styles from './RegisterPage.module.css'

const RegisterPage = () => {

  const navigate = useNavigate()

  return (
    <div className="page_container">

      <h3>Please Register:</h3>
      <RegisterForm />

      <BasicModal
         title='Connect With:'
         body={<>
          {/* steam */}
          <img
            className={styles.steam_button_img}
            src="/link_steam_button.png"
            alt="link button"
            onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_SERVER}/link-steam/`}
          />
          <br /><br />
          </>}
          footer={
            <div className="modal-footer">
              <button
               type="button"
               className="btn btn-secondary"
               data-bs-dismiss="modal"
               onClick={() => navigate('/')}
              >
                Skip for now
              </button>
            </div>
          }
         modalId='connect3rdParty'
        />

    </div>
  )
}

export default RegisterPage