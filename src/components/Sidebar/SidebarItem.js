import React from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '../Icons/Icon'

const SidebarItem = ({ to, icon, children, active }) => {
  return (
    <li className='SideBarItem has-text-centered'>
      {
        to
        ? <NavLink to={to} activeClassName='sidebar-active'>
          <p>{ icon && <Icon name={icon} /> }</p>
          <p>{children}</p>
        </NavLink>
        : <div className={`Action ${active ? 'sidebar-active' : ''}`}>
          <p>{ icon && <Icon name={icon} /> }</p>
          <p>{children}</p>
        </div>
      }
    </li>
  )
}

export default SidebarItem
