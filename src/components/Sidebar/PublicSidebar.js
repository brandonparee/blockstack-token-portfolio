import React from 'react'
import { NavLink } from 'react-router-dom'

const PublicSidebar = () => {
  return (
    <aside className='menu'>

      <ul className='menu-list'>
        <li><NavLink to='/' activeClassName='is-active'>Login</NavLink></li>
      </ul>
    </aside>
  )
}

export default PublicSidebar
