import { TProject } from '../../types/project'
import { defaultState } from '../defaultState'
import { createReducer } from './createReducer'
import { TState } from '../../types/state'
import { setProjectA, setProjectsA } from '../actions/project'
import { setListA } from '../actions/list'
import { ReducerCases } from '../actions/types'
import { taskCases } from './tasks'
import { id } from '../../utils/utilities'

const SET_PROJECT = (
  projects: TProject[],
  action: ReturnType<typeof setProjectA>
) => {
  if (action.project) {
    projects[id(projects, action.id)] = action.project
  } else {
    delete projects[id(projects, action.id)]
  }
}

const SET_LIST = (
  projects: TProject[],
  action: ReturnType<typeof setListA>
) => {
  const changing = projects[id(projects, action.projectId)].lists

  if (action.newColumn) {
    changing[id(changing, action.id)] = {
      ...action.newColumn
    } as any
  } else {
    changing.splice(id(changing, action.id), 1)
  }
}
const projectCases: ReducerCases<TProject[]> = {
  SET_PROJECT,
  SET_LIST,
  SET_PROJECTS: (projects, action: ReturnType<typeof setProjectsA>) => {
    return action.projects
  }
}

export const projectsReducer = createReducer<TState['projects']>(
  defaultState.projects,
  {
    ...projectCases,
    ...taskCases
  } as ReducerCases<TState['projects']>
)
