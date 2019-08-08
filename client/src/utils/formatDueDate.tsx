import { format, distanceInWordsToNow } from 'date-fns'
import { hasPassed } from './hasPassed'
import { TTask } from '../types/project'
import { toDaysHHMMSS } from './convertToTime'

// Jan 1st 12:02 am
const baseFormat = (date: Date): string => format(date, 'MMM do h:mm a')

const overdueFormat = (date: Date): string => {
  return 'Overdue by ' + distanceInWordsToNow(date)
}

const god = (date: Date, hasOver?: boolean): string => {
  return hasPassed(date) && hasOver
    ? overdueFormat(date)
    : 'Due ' + baseFormat(date)
}

export const formatDueDate = (task: TTask, hasOverDue?: boolean): string => {
  if (!task.dueDate) {
    return ''
  }

  if (task.startDate && task.dueDate) {
    return (
      // tslint:disable-next-line:prefer-template
      format(task.startDate, 'MMM d') +
      ' - ' +
      format(task.dueDate, 'MMM d, h:mm a')
    )
  }
  if (!task.recurrance) {
    return god(task.dueDate, hasOverDue)
  }

  if (task.recurrance) {
    return `Due every ${toDaysHHMMSS(
      task.recurrance.interval!,
      true
    )} next: ${god(task.dueDate, hasOverDue)}`
  }

  return 'Due on the next big thonk?'
}
