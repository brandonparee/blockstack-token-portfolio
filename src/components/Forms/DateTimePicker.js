import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class RenderDateTimePicker extends Component {
  state = { date: moment() }

  handleDateChange = (date) => {
    this.setState({ date })
    this.props.input.onChange(date)
  }

  render() {
    const { meta, label } = this.props

    return (
      <div className='field'>
        <div className='control'>
          <label className='label'>{label}</label>
          <DatePicker
            className='input'
            selected={this.state.date}
            showTimeSelect
            onChange={this.handleDateChange} />
          {
            meta.error && meta.touched &&
              <p className='help is-danger'>{meta.error}</p>
          }
        </div>
      </div>
    )
  }
}

export default RenderDateTimePicker
