import { TList } from '../../types/project'

export const setListA = (args: {
  id: string
  projectId: string
  newCol: TList | null
}) => ({
  type: 'SET_LIST',
  id: args.id,
  projectId: args.projectId,
  newColumn: args.newCol
})

export type ListAction = ReturnType<typeof setListA>

// lol
