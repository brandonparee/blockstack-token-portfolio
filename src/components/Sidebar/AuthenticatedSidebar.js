import React from 'react'
import SidebarItem from './SidebarItem'

const AuthenticatedSidebar = ({user}) => {
  const { username } = user.profile
  return (
    <aside className='menu'>
      <ul className='menu-list'>
        <SidebarItem exact to='/portfolio' icon='database'>Portfolio</SidebarItem>
        <SidebarItem to='/market-data' icon='line-chart'>Market Data</SidebarItem>
        <SidebarItem to='/preferences' icon='cog'>Preferences</SidebarItem>
        <SidebarItem to='/logout' icon='sign-out'>Logout</SidebarItem>
      </ul>
    </aside>
  )
}

export default AuthenticatedSidebar
