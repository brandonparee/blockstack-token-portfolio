import cc from 'cryptocompare'

const ONE_HOUR_MINUTES = 60
const ONE_DAY_HOURS = 24
const ONE_MONTH_DAYS = 30

export const chartTimes = {
  LAST_HOUR: {
    text: '1h',
    ccFunction: cc.histoMinute,
    options: {
      limit: ONE_HOUR_MINUTES
    }
  },
  LAST_DAY: {
    text: '1d',
    ccFunction: cc.histoHour,
    options: {
      limit: ONE_DAY_HOURS
    }
  },
  LAST_THREE_DAYS: {
    text: '3d',
    ccFunction: cc.histoHour,
    options: {
      limit: ONE_DAY_HOURS * 3
    }
  },
  LAST_WEEK: {
    text: '7d',
    ccFunction: cc.histoHour,
    options: {
      limit: ONE_DAY_HOURS * 7
    }
  },
  LAST_MONTH: {
    text: '1m',
    ccFunction: cc.histoDay,
    options: {
      limit: ONE_MONTH_DAYS
    }
  },
  LAST_YEAR: {
    text: '1y',
    ccFunction: cc.histoDay,
    options: {
      limit: ONE_MONTH_DAYS * 12
    }
  }
}

export const CHART_TOOLTIP_TEXT = {
  currentAmount: 'Fiat Value: ',
  close: 'Price: ',
  volume: 'Volume: '
}
