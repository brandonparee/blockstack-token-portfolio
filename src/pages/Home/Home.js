import React from 'react'
import { connect } from 'react-redux'

import Section from '../../components/Bulma/Section'

const mapStateToProps = () => {
  return {}
}

const Home = () => {
  return (
    <Section title='Home' />
  )
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
