import React from 'react'
import { connect } from 'react-redux'

export const HomeInScreen = (props) => {
  return (
    <>
      <div>HomeInScreen</div>
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeInScreen)