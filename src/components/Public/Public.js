import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

// Public routes are only accessible when not signed in with Blockstack
const Public = ({component, isAuthenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !isAuthenticated ? React.createElement(component, {...props})
          : <Redirect to='/' />
      }}
    />
  )
}

Public.propTypes = {
  component: PropTypes.func.isRequired
}

export default Public
