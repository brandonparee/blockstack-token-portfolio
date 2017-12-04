import React from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '../Icons/Icon'

const SidebarItem = ({to, icon, children}) => {
  return (
    <li className='SideBarItem has-text-centered'>
      <NavLink to={to} activeClassName='sidebar-active'>
        <p>{ icon && <Icon name={icon}/> }</p>
        <p>{children}</p>
      </NavLink>
    </li>
  )
}

export default SidebarItem
