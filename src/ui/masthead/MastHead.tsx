
import { FC, ReactNode } from 'react'
import styles from './MastHead.module.css'

type MastHeadProps = {
    header: string
    description: string
    children: ReactNode
}

const MastHead:FC<MastHeadProps> = ({ header, description, children }) => {
  return (
    <div
     className={styles.masthead_container}
    >   
        <img src="/container_bg.jpeg" alt="bg" />
        
        <div className={styles.masthead_overlay}>

            <h1>{header}</h1>

            <p>
            {description}
            </p>

            {children}
        </div>

    </div>
  )
}

export default MastHead