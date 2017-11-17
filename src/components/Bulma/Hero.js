import React from 'react'

const Hero = ({title, subtitle, titleClassName, subtitleClassName}) => (
  <div className='hero'>
    <div className='hero-body'>
      <div className='container'>
        <h1 className={`title ${titleClassName}`}>
          {title}
        </h1>
        <h2 className={`subtitle ${subtitleClassName}`}>
          {subtitle}
        </h2>
      </div>
    </div>
  </div>
)

export default Hero
