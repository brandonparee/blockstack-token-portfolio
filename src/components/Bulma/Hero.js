import React from 'react'

const Hero = ({title, subtitle, backgroundColor, titleClassName, subtitleClassName}) => (
  <div className={`hero is-${backgroundColor}`}>
    <div className='hero-body'>
      <div>
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
