
import { FC, ReactNode } from 'react'
import styles from './MastHead.module.css'

type MastHeadProps = {
    header: string
    description: string
    children: ReactNode
    height?: string
}

const MastHead:FC<MastHeadProps> = ({ header, description, children, height='70vh' }) => {
  return (
    <div
     className={styles.masthead_container}
     style={{ height: height }}
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