import moment from 'moment'

export const required = value => value ? undefined : 'Required'

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const date = value => value && moment(value).isValid() ? undefined : 'Must be a date'
