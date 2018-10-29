import React from 'react'
import FontAwesome from 'react-fontawesome'

const Icon = ({ name, ...rest }) => {
  return <FontAwesome {...rest} name={name} />
}

export default Icon
