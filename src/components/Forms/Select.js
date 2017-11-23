import React from 'react'

export const RenderSelect = ({ input, meta, label, options }) => {
  return (
    <div className='field'>
      <div className='control'>
        <label className='label'>{label}</label>
        <div className="select">
          <select {...input}>
            <option value='' disabled>Select</option>
            {
              options.map(({ name, abbreviation }) => {
                return <option key={abbreviation} value={abbreviation}>{`${name} (${abbreviation})`}</option>
              })
            }
          </select>
        </div>
        {
          meta.error && meta.touched &&
            <p className='help is-danger'>{meta.error}</p>
        }
      </div>
    </div>
  )
}
