import { cloneDeep } from 'lodash'
import { TProject, TTask } from '../types/project'

export const id = (
  arr: Array<any & { id: string }>,
  passedId: string
): number => {
  return arr.findIndex(item => item.id === passedId)
}

export const formalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/,/g, '')
    .replace(/ /g, '')
}

export const filterItemsFromIds = <T = any>(
  ids: number[],
  items: { [id: string]: any } & T // add index signature
): T => {
  const newItems = cloneDeep(items) // changed in past :()
  Object.keys(newItems)
    .map(key => parseInt(key, 10)) // Object.keys returns strings nomatter what
    .forEach((key: any) => {
      if (!ids.includes(key)) {
        delete newItems[key]
      }
    })
  return newItems
}

export const getDaysInMonth = (month: number, year: number): Date[] => {
  // Since no month has fewer than 28 days
  const date: Date = new Date(year, month, 1)
  const days: Date[] = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export const getAllTasks = (projects: TProject[]): TTask[] => {
  let tasks: TTask[] = []

  projects.map(project => {
    tasks = {
      ...tasks,
      ...project.tasks
    }
    return
  })

  return tasks
}

export const getProjectIdFromTaskId = (
  projects: TProject[],
  taskId: string
): string => {
  let result = ''

  Object.values(projects).map(proj => {
    Object.values(proj.tasks).map(task => {
      if (task.id === taskId) {
        result = proj.id
      }
      return
    })
  })

  return result
}

export const moveInArray = (element: any, index: number, offset: number) => {
  const newIndex = index + offset

  const newArr = [...element]

  if (newIndex > -1 && newIndex < newArr.length) {
    const removedElement = newArr.splice(index, 1)[0]
    newArr.splice(newIndex, 0, removedElement)
  }

  return newArr
}
