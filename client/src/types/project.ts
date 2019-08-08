export interface TProject {
  id: string
  name: string
  ownerId: string
  lists: Array<{
    taskIds: string[]
    name: string
    id: string
  }>

  tasks: TTask[]

  users: string[]

  isPrivate: boolean
}

export interface TTask {
  security?: {
    public: boolean
    assignedUsers: string[] // teams or users
  } | null

  progress: 0 | 1 | 2 | number

  id: string
  name: string
  points: number
  timeWorkedOn: number
  color: string
  dueDate?: Date
  startDate?: Date

  comments: Array<{
    id: string
    comment: string
    dateAdded: string
    lastEdited?: Date
  }>
  subTasks: Array<{
    name: string
    completed: boolean
    id: string
  }>
  recurrance?: {
    interval?: number
    nextDue?: Date
  } | null
}

export type TList = TProject['lists'][0]

export type TComment = TTask['comments'][0]

export type TSubtask = TTask['subTasks'][0]
