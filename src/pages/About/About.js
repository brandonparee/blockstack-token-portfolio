import React from 'react'

import Section from '../../components/Bulma/Section'

const About = () => {
  return (
  <div className="About content">
    <Section title='About'>
      <p className="is-size-5">
        Peachy Portfolio is a Cryptocurrency Portfolio application built on top of Blockstack.
        Peachy Portfolio is open source and available on  <a href="https://github.com/brandonparee/blockstack-token-portfolio">Github</a> (feature requets welcome!)
      </p>
      <h3 className="is-size-4">Features</h3>
      <ul>
        <li>Authentication through Blockstack</li>
        <li>Information stored encrypted using Blockstack</li>
        <li>Add transactions to your portfolio using nearly any trading pair</li>
        <li>Get at a glance portfolio changes for the past 24 hours, or graphs for porfolio value over time</li>
        <li>Up to date market data for more than 1300 Cryptocurrencies</li>
        <li>And more!</li>
      </ul>
      <h3 className="is-size-4">Coming Soon</h3>
      <ul>
        <li>More metrics -- Get a deeper dive into your investments</li>
        <li>Real Time Price Updates</li>
        <li>ICO Tracking</li>
        <li>View raw data files stored by the application</li>
      </ul>
      <h3 className="is-size-4">Contact</h3>
      <p>Any questions, comments or feature requests can be sent <a href="mailto:brandon.paree@gmail.com?Subject=Peachy%20Portfolio%Comment">here.</a></p>
      <p>Features can also be requested through an issue opened on <a href="https://github.com/brandonparee/blockstack-token-portfolio/issues">Github</a></p>
    </Section>
  </div>
  )
}

export default About
