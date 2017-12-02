export const UPDATE_CHART_TIME_RANGE = 'UPDATE_CHART_TIME_RANGE'

export const setChartTimeRange = (chartTime) => {
  return { type: UPDATE_CHART_TIME_RANGE, payload: chartTime }
}
