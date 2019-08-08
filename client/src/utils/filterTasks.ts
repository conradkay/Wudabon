export const meme = 'meme'

/*
const filterByDate = (task: TTask, filterData: TFilterData): boolean => {
  if (filterData.dueDate === 'all') {
    return true
  }

  if (filterData.dueDate === 'none' && !task.dueDate) {
    return true
  }

  if (!task.dueDate) {
    return false // tasks should have a due date
  }

  if (filterData.dueDate === 'has') {
    return isDate(task.dueDate) // include tasks that have a due date
  }

  if (isArray(filterData.dueDate) && task.dueDate) {
    const epoch = task.dueDate.getTime()
    // they want to know if task dueDate
    if (
      epoch <= filterData.dueDate[0].getTime() ||
      epoch >= filterData.dueDate[1].getTime()
    ) {
      return false // if the
    }
  }

  if (filterData.dueDate === 'today' || filterData.dueDate === 'tomorrow') {
    const amount = filterData.dueDate === 'today' ? 0 : 1
    if (!isSameDay(addDays(new Date(), amount), task.dueDate)) {
      return false
    }
  }

  return true
}

const filterByMember = (task: TTask, filterData: TFilterData): boolean => {
  if (filterData.members.includes('all')) {
    return true
  }
  let result = false

  task.assignedUsers.map(assignedUser => {
    if (filterData.members.includes(assignedUser)) {
      result = true
    }
  })

  return result
}

const filterByPoints = (task: TTask, filterData: TFilterData): boolean => {
  // minimum points, 0 if include all tasks
  return filterData.points === 0 ? true : task.points >= filterData.points
}

const filterByColor = (task: TTask, filterData: TFilterData): boolean => {
  if (filterData.color === 'all') {
    return true
  }

  if (
    filterData.color !== 'all' &&
    task.color &&
    task.color === filterData.color
  ) {
    return true
  }

  return false
}

const filterByTag = (task: TTask, filterData: TFilterData): boolean => {
  if (filterData.tags.includes('all')) {
    return true
  }
  let result = false

  task.tags.map(tagId => {
    if (filterData.tags.includes(tagId)) {
      result = true
    }
  })

  return result
}

export const filterTasks = (
  tasks: TTask[],
  filterData: TFilterData
): TTask[] => {
  return tasks.filter(task => {
    return (
      filterByMember(task, filterData) &&
      filterByColor(task, filterData) &&
      filterByPoints(task, filterData) &&
      filterByDate(task, filterData) &&
      filterByTag(task, filterData)
    )
  })
}

*/
