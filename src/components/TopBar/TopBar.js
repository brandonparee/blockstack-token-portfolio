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
    <div className='top-bar has-text-right'>
      {
        user.isAuthenticated &&
        <div className='TopBar'>
          <div className='Section has-text-right'>
            <div className='Text'>
              <h1 className='is-size-2 fancy'>Hello,</h1>
              <p className='menu-title'>{user.profile.username || 'Nameless user'}</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(TopBar)
