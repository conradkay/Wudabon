import { isBefore } from 'date-fns'
import { isArray } from 'lodash'

export const hasPassed = (date?: Date | [Date, Date]): boolean => {
  if (isArray(date)) {
    return (date as any)[1]
  }
  return date ? isBefore(date, new Date()) : false
}
