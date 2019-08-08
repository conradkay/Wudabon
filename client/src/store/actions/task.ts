import { TTask } from './../../types/project'

export const setTaskA = (args: {
  id: string
  newTask: TTask | null
  projectId: string
}) => ({
  type: 'SET_TASK',
  id: args.id,
  projectId: args.projectId,
  newTask: args.newTask
})

export type TaskAction = ReturnType<typeof setTaskA>
