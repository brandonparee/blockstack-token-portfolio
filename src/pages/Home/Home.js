import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({}) => {
  return {}
}

const Home = ({}) => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
