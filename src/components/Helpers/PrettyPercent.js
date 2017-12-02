import React from 'react'

const PrettyPercent = ({ value }) => {
  return (
    <span
      className={Math.sign(value) >= 0 ? 'has-text-success' : 'has-text-danger'}>
      {`${Math.sign(value) >= 0 ? '+' : ''}${value}%`}
    </span>
  )
}

export default PrettyPercent
