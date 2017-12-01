import React from 'react'

const PrettyPercent = ({ value }) => {
  return (
    <span
      className={Math.sign(value) >= 0 ? 'has-text-success' : 'has-text-danger'}>
        {`${value}%`}
    </span>
  )
}

export default PrettyPercent
