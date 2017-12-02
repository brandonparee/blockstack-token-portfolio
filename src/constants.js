const FIVE_MINUTES = 300
const FIFTEEN_MINUTES = 900
const THIRTY_MINUTES = 1800
const TWO_HOURS = 7200
const FOUR_HOURS = 14400
const ONE_DAY = 86400

export const chartTimes = {
  LAST_HOUR: {
    moment: [1, 'hour'],
    period: FIVE_MINUTES,
    text: '1h'
  },
  LAST_DAY: {
    moment: [1, 'day'],
    period: THIRTY_MINUTES,
    text: '1d'
  },
  LAST_THREE_DAYS: {
    moment: [3, 'days'],
    period: TWO_HOURS,
    text: '3d'
  },
  LAST_WEEK: {
    moment: [7, 'days'],
    period: TWO_HOURS,
    text: '7d'
  },
  LAST_MONTH: {
    moment: [1, 'month'],
    period: ONE_DAY,
    text: '1m'
  },
  LAST_YEAR: {
    moment: [1, 'year'],
    period: ONE_DAY,
    text: '1y'
  }
}
