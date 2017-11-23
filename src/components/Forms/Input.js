import React from 'react'

export const RenderInput = ({ input, meta, label }) => {
  return (
    <div className='field'>
      <div className='control'>
        <label className='label'>{label}</label>
        <input className='input' {...input} />
        {
          meta.error && meta.touched &&
            <p className='help is-danger'>{meta.error}</p>
        }
      </div>
    </div>
  )
}
