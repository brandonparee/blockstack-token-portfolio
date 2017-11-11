import React from 'react'
import { userLogout } from '../../actions/userActions'
import { connect } from 'react-redux'

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => {
      dispatch(userLogout())
    }
  }
}

const Logout = ({user, handleLogout, ...rest}) => {
  // Only attept `signUserOut` if logged in, since this route is accessible
  // when not logged in
  if (user.isAuthenticated) {
    handleLogout()
  }

  return (
    <h2>Signed Out</h2>
  )
}

const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout)

export default LogoutContainer
