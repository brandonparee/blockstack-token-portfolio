import React from 'react'
import { connect } from 'react-redux'

import './TopBar.css'

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const TopBar = ({ user }) => {
  return (
    <div className="top-bar has-text-right">
      {
        user.isAuthenticated &&
        <div className="TopBar">
          <div className="Section">
            <p className='menu-title is-size-5'>Hello, {user.profile.username || 'Nameless user'}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(TopBar)
