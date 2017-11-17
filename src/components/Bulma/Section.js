import React from 'react'

const Section = ({title, subtitle, children}) => (
  <section className='section'>
    <h1 className='title'>{title}</h1>
    <h2 className='subtitle'>{subtitle}</h2>
    {children}
  </section>
)

export default Section
