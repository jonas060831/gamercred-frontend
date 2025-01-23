import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        
        <NavLink to='/'>
            <img src="/gamercred.png" alt="gamercred logo" />
        </NavLink>
        
        {/* desktop */}
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

            <NavLink to="/login" style={{ color: '#fa9806' }}>Login</NavLink>    

        </div>

        
    </nav>
  )
}

export default Navbar