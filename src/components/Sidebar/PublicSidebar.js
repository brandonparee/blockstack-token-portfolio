import React from 'react'
import SidebarItem from './SidebarItem'

const PublicSidebar = () => {
  return (
    <aside className='menu'>
      <ul className='menu-list NavItems'>
        <div className="NavLinks">
          <SidebarItem exact to='/' icon='sign-in'>Login</SidebarItem>
        </div>
      </ul>
    </aside>
  )
}

export default PublicSidebar
