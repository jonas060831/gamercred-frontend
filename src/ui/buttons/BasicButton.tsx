import { FC } from "react"


type BasicButtonProps = {
    title: string
    handleClick: () => void
}




const BasicButton:FC<BasicButtonProps> = ({ title, handleClick }) => {
  return (
    <button
     style={{ background: 'none', border: 'none', color: '#fa9806' }}
     onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default BasicButton