import React from 'react'
import { NavLink } from 'react-router-dom'

const AuthenticatedSidebar = ({user}) => {
  const { username } = user.profile
  return (
    <aside className='menu'>
      <p className='menu-title is-size-5'>Hello, {username}</p>
      <ul className='menu-list'>
        <li><NavLink exact to='/' activeClassName='is-active is-blockstack'>Home</NavLink></li>
        <li><NavLink to='/portfolio' activeClassName='is-active'>Portfolio</NavLink></li>
        <li><NavLink to='/preferences' activeClassName='is-active'>Preferences</NavLink></li>
        <li><NavLink to='/logout' activeClassName='is-active'>Logout</NavLink></li>
      </ul>
    </aside>
  )
}

export default AuthenticatedSidebar
