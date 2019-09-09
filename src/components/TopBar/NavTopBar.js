import React from 'react'

import './NavTopBar.scss'
import logo from './Logo.svg'

const NavTopBar = ({ user }) => {
  return (
    <div className='nav-top-bar NavTopBar'>
      <img src={logo} className='logo' alt='logo' />
      <h1 className='title'>peachy.</h1>
    </div>
  )
}

export default NavTopBar
