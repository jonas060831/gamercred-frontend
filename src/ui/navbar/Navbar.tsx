// https://framermotion.framer.website

import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import BasicButton from '../buttons/BasicButton'

const Navbar = () => {

  const navigate = useNavigate()
  const [isOCNOpen, setisOCNOpen] = useState<boolean>(false)
  const [user, setUser] =useState<any>({})
  
  const toggleOffCanvasMenu = () :void => setisOCNOpen(!isOCNOpen)

  useEffect(() => {

    getUser()

  }, [])

  const getUser = () => {

    try {
        
        const user:any = localStorage.getItem('user')
        const parsedUser = JSON.parse(user)

        if(!user) throw new Error('No user found')

        setUser(parsedUser)

    } catch (error) {
        console.log(error)
    }

  }

  const handleLogout = () => {

    localStorage.removeItem('user')

    navigate('/login')
  }
  
  return (
    <>
        <nav className={styles.navbar}>
            <NavLink to='/'>
                <img src="/gamercred.png" alt="gamercred logo" />
            </NavLink>
            
            {/* desktop only*/}
            <div className={styles.menu_container}>

                <NavLink to="/search">
                    <i className="fa-solid fa-magnifying-glass" style={{ fontSize: 'larger', color: 'black' }}></i>
                </NavLink>

                <li className="nav-item dropdown">
                    <NavLink to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Product
                        <i className="fa fa-chevron-down ms-2"></i>
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">Action</a>
                        </li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <NavLink to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Resources
                        <i className="fa fa-chevron-down ms-2"></i>
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">Action</a>
                        </li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <NavLink to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Community
                        <i className="fa fa-chevron-down ms-2"></i>
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">Action</a>
                        </li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>

                <NavLink to="/report-form" >Report Form</NavLink> 

                

                {
                    Object.keys(user).length === 0 ? (
                        <NavLink to="/login" style={{ color: '#fa9806' }}>Login</NavLink>
                    ) : (
                        <BasicButton title='Logout' handleClick={handleLogout}/>
                    )
                }

            </div>

            {/* tablet and mobile */}
            <span className={styles.toggle_menu} onClick={toggleOffCanvasMenu}>
                <i className="fa-solid fa-bars"></i>
            </span>

            
        </nav>

        {/* overlay */}
        {
            isOCNOpen && (
                <div className={styles.overlay} onClick={toggleOffCanvasMenu}></div>
            )
        }

        {/* off canvas menu */}
        <motion.div
         className={styles.off_canvas_menu}
         initial={{ x: "100%" }}
         animate={{ x: isOCNOpen ? "0%" : "100%" }}
         transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
            
            <NavLink to="/login" style={{ color: '#fa9806', alignSelf: 'center' }}>Login</NavLink>

            <hr />
            <NavLink to="/search" style={{ marginTop: '3rem' }}>
                Search
            </NavLink>

            <li className="nav-item dropdown">
                <NavLink to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Product
                    <i className="fa fa-chevron-right ms-2"></i>
                </NavLink>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">Action</a>
                    </li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <NavLink to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Resources
                    <i className="fa fa-chevron-right ms-2"></i>
                </NavLink>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">Action</a>
                    </li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>

            <li className="nav-item dropdown">
                <NavLink to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Community
                    <i className="fa fa-chevron-right ms-2"></i>
                </NavLink>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">Action</a>
                    </li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>


            <NavLink to="/report-form" >Report Form</NavLink>


            <div style={{ marginTop: '10rem' }}>
                GamerCred {import.meta.env.VITE_GAMER_CRED_VERSION}
            </div>

        </motion.div>
    </>
  )
}

export default Navbar