import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'

function NavBar() {
  const router = useRouter()
  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const isActive = (r) => {
    if(r === router.pathname){
      return " active"
    }else{
      return ""
    }
  }

  const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
        return router.push('/')
  }

    const loggedRouter = () => {
      return(
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={auth.user.avatar} alt={auth.user.name}
           style={{
            borderRadius: '50%', width: '30px', height: '30px',
            transform: 'translateY(-3px)', marginRight: '3px'
           }} /> {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#"><i className="fas fa-info-circle"></i> Profile</a>
            <a className="dropdown-item"
             onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      </li>
      )
      
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link href="/">
            <a className="navbar-brand">TuckerwithCode</a>
          </Link>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link href="/cart">
        <a className={"nav-link" + isActive('/cart')}>
          <i className="fas fa-shopping-cart" aria-hidden="true"></i> Cart
          </a>
        </Link>
      </li>

      {
        Object.keys(auth).length === 0 
        ? <li className="nav-item">
        <Link href="/signin">
        <a className={"nav-link" + isActive('/signin')}>
          <i className="fas fa-user" aria-hidden="true"></i> Sign in</a>
        </Link>
      </li>
      : loggedRouter()
      }

    </ul>
  </div>
</nav>
    )
}

export default NavBar
