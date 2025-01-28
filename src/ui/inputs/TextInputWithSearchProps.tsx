import { FC } from "react"


type TextInputWithSearchProps = {
    value: string
    onChange: (event: any) => void
}

const TextInputWithSearch:FC<TextInputWithSearchProps> = ({ value, onChange }) => {
  return (
    <div className="input-group mb-3" style={{ width: '100%' }}>

        <input
         type="text"
         className="form-control"
         placeholder="Recipient's username"
         aria-label="Recipient's username"
         aria-describedby="button-addon2" 
         style={{ background: 'none', color: 'white' }}
         value={value}
         onChange={onChange}
        />
        
        <button
         className="btn btn-outline-secondary"
         type="submit"
         id="button-addon2"
         style={{ color: 'white' }}
        >
            <i className="fa-solid fa-magnifying-glass"></i>    
        </button>

    </div>
  )
}

export default TextInputWithSearch