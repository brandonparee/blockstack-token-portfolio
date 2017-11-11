import React from 'react'
import { connect } from 'react-redux'

import AuthenticatedSidebar from './AuthenticatedSidebar'
import PublicSidebar from './PublicSidebar'

const mapStateToProps = ({user, router}) => {
  return {
    user,
    router
  }
}

const Sidebar = ({user, ...rest}) => {
  return (
    <div>
      {
        (user.isAuthenticated)
        ? <AuthenticatedSidebar user={user} {...rest} />
        : <PublicSidebar {...rest} />
      }
    </div>
  )
}

const SidebarContainer = connect(mapStateToProps)(Sidebar)

export default SidebarContainer
