import React from 'react'
import SidebarItem from './SidebarItem'
import { connect } from 'react-redux'

import TransactionToggle from '../Helpers/TransactionToggle'

const mapStateToProps = ({ transactions }) => {
  return {
    transactionView: transactions.transactionView
  }
}

const AuthenticatedSidebar = ({ user, transactionView }) => {
  const { username } = user.profile
  return (
    <aside className='menu'>
      <ul className='menu-list NavItems'>
        <div className='NavLinks'>
          <SidebarItem exact to='/portfolio' icon='database'>Portfolio</SidebarItem>
          <SidebarItem to='/market-data' icon='line-chart'>Market Data</SidebarItem>
        </div>

        <div className='Actions'>
          <TransactionToggle><SidebarItem icon='plus' active={transactionView}>Add Transaction</SidebarItem></TransactionToggle>
          <SidebarItem to='/preferences' icon='cog'>Preferences</SidebarItem>
          <SidebarItem to='/about' icon='info'>About</SidebarItem>
          <SidebarItem to='/logout' icon='sign-out'>Logout</SidebarItem>
        </div>
      </ul>
    </aside>
  )
}

export default connect(mapStateToProps)(AuthenticatedSidebar)
