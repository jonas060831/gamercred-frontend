import { FC } from 'react'


type ButtonProps = {
    title: string
    handleClick: (event: any) => void
}

const Button:FC<ButtonProps> = ({ title, handleClick}) => {
  return (
    <button
     onClick={handleClick}
     style={{ backgroundColor: 'red', border: 'none', padding: '1rem', borderRadius: '10px'}}
    >
     {title}
    </button>
  )
}

export default Button