import React from 'react'

const PrettyPercent = ({ value }) => {
  value = value ? parseFloat(value) : 0;
  return (
    <span
      className={Math.sign(value) >= 0 ? 'has-text-success' : 'has-text-danger'}>
      {`${Math.sign(value) >= 0 ? '+' : ''}${value.toFixed(4)}%`}
    </span>
  )
}

export default PrettyPercent
