import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <ul className="nav-bar-items">
        <Link to="/" className="link-list">
          <li className="list-items">Home</li>
        </Link>
        <Link to="/jobs" className="link-list">
          <li className="list-items">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={logoutBtn}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
