import React from 'react'

import './Section.css'

const Section = ({title, subtitle, children}) => (
  <section className='Section section'>
    <h1 className='title'>{title}</h1>
    <h2 className='subtitle'>{subtitle}</h2>
    {children}
  </section>
)

export default Section
