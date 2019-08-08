import { TaskProps, ProjectProps } from './models/Project'
import uuid from 'uuid'

export const defaultTask: any = {
  name: 'Task',
  points: 0,
  subTasks: [],
  timeWorkedOn: 0,
  comments: [],
  color: '#FFFFFF',
  security: {
    public: true,
    assignedUsers: []
  },
  progress: 0
}

export const tags = [
  { name: 'error', color: '#ffccd6' },
  {
    name: 'review',
    color: '#ffe7b6'
  },
  {
    name: 'important',
    color: '#c3ddff'
  }
]

export const taskObjects = (ids: any[]): TaskProps[] => [
  {
    ...defaultTask,
    id: ids[0],
    name: 'Welcome To Mantella!'
  },
  { ...defaultTask, id: ids[1], name: 'This is a Task, click on it!' },
  {
    ...defaultTask,
    id: ids[2],
    name: 'Tasks are part of lists, drag this task into another list'
  },
  {
    ...defaultTask,
    id: ids[3],
    name: 'Lists can be assigned to projects and reordered'
  },
  {
    ...defaultTask,
    id: ids[4],
    name:
      'Projects can be created at any time, you can have as many projects as you want!'
  },
  {
    ...defaultTask,
    id: ids[5],
    name: 'You can add colors to Tasks',
    color: '#c3ddff'
  },
  {
    ...defaultTask,
    id: ids[6],
    name: 'Tasks can be assigned a Point importance',
    points: 2
  },
  {
    ...defaultTask,
    id: ids[7],
    name: 'Create a list by pressing the large + button within a project'
  },
  {
    ...defaultTask,
    id: ids[8],
    name: 'Tasks can be dragged into different lists or reordered within a list'
  },
  {
    ...defaultTask,
    id: ids[9],
    name: 'You can add, delete, and edit comments to Tasks'
  },
  {
    ...defaultTask,
    id: ids[10],
    name: 'Tasks can include subTasks',
    subTasks: [{ name: 'This is a subtask!', completed: false, id: uuid() }]
  },
  {
    ...defaultTask,
    id: ids[11],
    name: 'You can invite members to projects and see who is online'
  },
  {
    ...defaultTask,
    id: ids[12],
    name: 'All board activity will be logged, in Beta'
  },
  {
    ...defaultTask,
    id: ids[13],
    name: 'Log time on Tasks by clicking the pomodoro tab button'
  },
  {
    ...defaultTask,
    id: ids[14],
    name: 'Tasks can be assigned to one or more people!'
  },
  {
    ...defaultTask,
    id: ids[15],
    name:
      'I hope you enjoy Mantella, email me with feature requests or bugs, I appreciate all feedback!'
  }
]

export const projectData = (
  ids: string[],
  tasks: ProjectProps['tasks'],
  newUserId: string,
  projectId: string
): ProjectProps => {
  const columnIds = [uuid(), uuid(), uuid()]

  return {
    name: 'Tutorial Project',
    lists: [
      {
        id: columnIds[0],
        name: 'Fundementals',
        taskIds: [ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]]
      },
      {
        id: columnIds[1],
        name: 'Setting Up',
        taskIds: [ids[6], ids[7], ids[8], ids[9]]
      },
      {
        id: columnIds[2],
        name: 'Other Features',
        taskIds: [ids[10], ids[11], ids[12], ids[13], ids[14]]
      }
    ],
    ownerId: newUserId,
    id: projectId,
    tasks: tasks,
    users: [newUserId],
    isPrivate: false
  }
}
