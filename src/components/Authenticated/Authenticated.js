import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import * as blockstack from 'blockstack'

// Authenticated routes are only available when signed in with Blockstack
const Authenticated = ({component, ...rest}) => {
  // This will be stored in redux eventually
  const isAuthenticated = blockstack.isUserSignedIn()

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? React.createElement(component, {...props})
          : <Redirect to='/logout' />
      }}
    />
  )
}

Authenticated.propTypes = {
  component: PropTypes.func.isRequired
}

export default Authenticated
