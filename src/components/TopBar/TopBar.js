import React from 'react'
import { connect } from 'react-redux'

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
        <p className='menu-title is-size-5'>Hello, {user.profile.username || 'Nameless user'}</p>
      }
    </div>
  )
}

export default connect(mapStateToProps)(TopBar)
