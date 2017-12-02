import React from 'react'
import { NavLink } from 'react-router-dom'

const AuthenticatedSidebar = ({user}) => {
  const { username } = user.profile
  return (
    <aside className='menu'>
      <p className='menu-title is-size-5'>Hello, {username || 'Nameless user'}</p>
      <ul className='menu-list'>
        <li><NavLink exact to='/' activeClassName='sidebar-active is-blockstack'>Home</NavLink></li>
        <li><NavLink to='/portfolio' activeClassName='sidebar-active'>Portfolio</NavLink></li>
        <li><NavLink to='/market-data' activeClassName='sidebar-active'>Market Data</NavLink></li>
        <li><NavLink to='/preferences' activeClassName='sidebar-active'>Preferences</NavLink></li>
        <li><NavLink to='/logout' activeClassName='sidebar-active'>Logout</NavLink></li>
      </ul>
    </aside>
  )
}

export default AuthenticatedSidebar
