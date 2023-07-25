import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="nav-logo"
      />
      <div className="navbar-mobile">
        <ul className="nav-menu-list">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <AiFillHome className="nav-img" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <BsBriefcaseFill className="nav-img" />
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-img">
          <FiLogOut className="nav-img" />
        </button>
      </div>
      <div className="navbar-pc">
        <ul className="nav-menu-list">
          <li className="nav-menu-item-pc">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item-pc">
            <Link to="/" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button">
          Logout
        </button>
      </div>
    </div>
  </nav>
)

export default Header
