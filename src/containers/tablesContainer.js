import React from 'react'
import { connect } from 'react-redux'
import { addField, setType } from '../actions/fields'
import Tables from '../components/Tables'

const mapDispatchToProps = dispatch => ({
    addField: () => dispatch(addField()),
    setType : id => dispatch(setType(id))
  })

export default connect(data=>data,mapDispatchToProps)(Tables)