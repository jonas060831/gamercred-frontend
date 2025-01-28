import { FC } from "react"


type TextInputWithSearchProps = {
    value: string
    onChange: (event: any) => void
    placeholder: string
}

import styles from './TextInputWithSerachProps.module.css'

const TextInputWithSearch:FC<TextInputWithSearchProps> = ({ value, onChange, placeholder }) => {
  return (
    <>
      <div className={`input-group mb-3 ${styles.text_input_container}`} style={{ width: '100%' }}>

          <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-describedby="button-addon2" 
          style={{ backgroundColor: 'rgba(209, 209, 209, 0.208)', color: 'white', padding: '1rem', outline: 'green' }}
          value={value}
          onChange={onChange}
          />
          
          <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
          style={{ color: 'white', padding: '1rem', border: '2px solid white' }}
          >
              <i className="fa-solid fa-magnifying-glass"></i>    
          </button>
      </div>

      
      <span className={styles.how_to_span} style={{ marginBottom: '20px' }}>how to <i className="fa-solid fa-question"></i></span>

    </>
  )
}

export default TextInputWithSearch