import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './ButtonLink.module.css'


type ButtonLinkProps = {
    title: string
    to: string
    type?: 'primary' | 'outline'

}   

const ButtonLink:FC<ButtonLinkProps> = ({ title, to, type='primary' }) => {
  return (
    <NavLink
     to={to}
     className={type === 'primary' ? styles.primary : styles.outline}
    >
        {title}
    </NavLink>
  )
}

export default ButtonLink