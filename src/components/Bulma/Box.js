import React from 'react'

const Box = ({ className, children }) => (
  <div className={className}>
    <div className='box'>
      <div className='media-content' >
        { children }
      </div>
    </div>
  </div>
)

export default Box
