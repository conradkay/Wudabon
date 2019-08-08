import { TProject } from './../../types/project'

export const setProjectsA = (projects: TProject[]) => ({
  type: 'SET_PROJECTS',
  projects
})

export const setProjectA = (args: {
  id: string
  newProj: TProject | null
}) => ({
  type: 'SET_PROJECT',
  id: args.id,
  project: args.newProj
})

export const selectMemberA = (args: { projectId: string; id: string }) => ({
  type: 'SELECT_MEMBER',
  id: args.id,
  projectId: args.projectId
})

export type ProjectAction =
  | ReturnType<typeof setProjectsA>
  | ReturnType<typeof setProjectA>
  | ReturnType<typeof selectMemberA>
