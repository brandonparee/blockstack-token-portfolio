import React from 'react'
import moment from 'moment'

import { CHART_TOOLTIP_TEXT as tooltipText } from '../../constants'
import Box from '../Bulma/Box'
import Fiat from '../Helpers/Fiat'

const CustomTooltip = ({ label, payload, type, active }) => {
  if (active) {
    return (
      <Box>
        <h3 className="has-text-2">{moment.unix(label).format('MMM DD YYYY h:mma')}</h3>
        {
          (payload || []).map((singleItem) => {
            const borderStyle = {
              borderLeft: `5px solid ${singleItem.color}`,
              paddingLeft: '5px'
            }
            return (
              <div key={singleItem.name} style={borderStyle}>
                <strong>{tooltipText[singleItem.name]}: </strong>
                <Fiat value={singleItem.value} />
              </div>
            )
          })
        }
      </Box>
    )
  }

  return null
}

export default CustomTooltip
