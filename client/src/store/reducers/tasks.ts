import { ReducerCases } from '../actions/types'
import { setTaskA } from '../actions/task'
import { tickA } from '../actions/pomodoro'
import { TProject } from '../../types/project'
import { id } from '../../utils/utilities'

const SET_TASK = (
  projects: TProject[],
  action: ReturnType<typeof setTaskA>
) => {
  const project = projects[id(projects, action.projectId)]
  const tasks = project.tasks
  if (action.newTask === null) {
    // REFERENCE CLEANUP

    project.lists.map(list => {
      if (list.taskIds.includes(action.id)) {
        list.taskIds.splice(list.taskIds.indexOf(action.id), 1)
      }
    })

    project.tasks.splice(project.tasks.findIndex(tsk => tsk.id === action.id))
  } else {
    tasks[id(tasks, action.id)] = {
      ...action.newTask
    }
  }
}

// const SET_SUBTASK = (projects: TProjects, action) => {}
// const SET_COLUMN = () => {}

const TICK = (projects: TProject[], action: ReturnType<typeof tickA>) => {
  if (action.taskId && action.projectId) {
    const proj = projects[id(projects, action.projectId)]
    proj.tasks[id(proj.tasks, action.taskId)].timeWorkedOn += 1
  }
}

export const taskCases = {
  TICK,
  SET_TASK
} as ReducerCases<TProject[]>
