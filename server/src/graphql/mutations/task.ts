import { ProjectModel, TaskProps, ProjectProps } from './../../models/Project'
import { MutationResolvers } from '../../graphql/types'
import uuid from 'uuid'

const createTask: MutationResolvers['createTask'] = async (parent, obj) => {
  const taskId = uuid()

  const proj = await ProjectModel.findOne({ id: obj.projId })

  if (proj) {
    proj.tasks.push({
      id: taskId,
      name: obj.taskInfo.name || 'Unnamed Task',
      progress: 0,
      points: obj.taskInfo.points || 0,
      timeWorkedOn: 0,
      color: obj.taskInfo.color || '#FFFFFF',
      startDate: new Date(),
      dueDate: obj.taskInfo.dueDate
        ? new Date(obj.taskInfo.dueDate)
        : undefined,
      subTasks: [],
      comments: [],
      security: {
        assignedUsers: [],
        public: true
      }
    } as TaskProps)

    const list = proj.lists.find((col) => col.id === obj.listId)!
    list.taskIds = [...list.taskIds, taskId]

    const newProj = await proj.save()

    const pure: ProjectProps = await newProj.toObject()

    if (pure) {
      const task = pure.tasks.find((tk) => taskId === tk.id)
      return {
        project: pure,
        task: task!
      }
    }
  }
  throw new Error('proj id not exist')
}
const editTask: MutationResolvers['editTask'] = async (parent, obj) => {
  const project = await ProjectModel.findOne({ id: obj.projId })

  if (project) {
    const task: TaskProps = project.tasks.find((tsk) => tsk.id === obj.taskId)!

    task.name = obj.task.name || task.name
    task.points = obj.task.points || task.points
    // dueDate
    // task.lastEdited = new Date()
    // task.recurrance = obj.task.recurrance || task.recurrance
    task.color = obj.task.color || task.color

    const newProj = await project.save()
    const pure = await newProj.toObject()
    if (pure) {
      if (task) {
        return {
          project: pure,
          task: newProj.tasks.find((tsk) => tsk.id === obj.taskId)
        }
      } else {
        throw new Error('Task not created')
      }
    }
  }
  throw new Error('project not able to be updated')
}
const deleteTask: MutationResolvers['deleteTask'] = async (parent, obj) => {
  const proj = await ProjectModel.findOne({ id: obj.projId })

  if (proj) {
    (proj.tasks.find((tsk) => tsk.id === obj.id) as any).remove()

    proj.lists.map((list) => {
      list.taskIds.splice(list.taskIds.indexOf(obj.id), 1)
    })

    const newProj = await proj.save()
    return { project: newProj.toObject(), task: null }
  }

  throw new Error('project not defined')
}

const dragTask: MutationResolvers['dragTask'] = async (
  parent,
  obj,
  context
) => {
  const proj = await ProjectModel.findOne({ id: obj.projectId })

  if (proj) {
    const oldList = proj.lists[
      proj.lists.findIndex((list) => list.id === obj.oldListId)
    ]!
    const newList = proj.lists[
      proj.lists.findIndex((list) => list.id === obj.newListId)
    ]!

    const task = proj.tasks[proj.tasks.findIndex((tsk) => tsk.id === obj.id)]

    if (task) {
      task.progress = obj.newProgress as 0 | 1 | 2
    }

    oldList.taskIds = oldList.taskIds.filter((taskId) => taskId !== obj.id)
    newList.taskIds.splice(obj.newIndex, 0, obj.id)

    const newProj = await proj.save()

    const pure = await newProj.toObject()

    return {
      project: pure as ProjectProps,
      task: pure.tasks.find((tsk: any) => tsk.id === obj.id) as any
    }
  }

  throw new Error('project not defined')
}

const setSubtask: MutationResolvers['setSubtask'] = async (parent, obj) => {
  const proj = await ProjectModel.findOne({ id: obj.projId })
  if (proj) {
    const task: TaskProps = proj.tasks.find((tsk) => tsk.id === obj.taskId)!

    if (obj.subtaskId) {
      const subTask: TaskProps['subTasks'][0] = task.subTasks.find(
        (subT) => subT.id === obj.subtaskId
      )!

      if (obj.info) {
        (subTask as any).remove()
      } else {
        subTask.completed =
          obj.info!.completed !== null && obj.info!.completed !== undefined
            ? obj.info!.completed
            : subTask.completed

        subTask.name =
          obj.info!.name !== null && obj.info!.name !== undefined
            ? obj.info!.name
            : subTask.name
      }
    } else {
      task.subTasks.push({
        completed: false,
        name: obj.info!.name || 'Subtask',
        id: uuid()
      })
    }

    const newProj = await proj.save()

    return newProj.tasks.find((tsk) => tsk.id === obj.taskId)!
  }

  throw new Error('project not defined')
}

const setComment: MutationResolvers['setComment'] = async (parent, obj) => {
  const proj = await ProjectModel.findOne({ id: obj.projId })
  if (proj) {
    const task: TaskProps = proj.tasks.find((tsk) => tsk.id === obj.taskId)!

    if (obj.commentId) {
      const comment: TaskProps['comments'][0] = task.comments.find(
        (com) => com.id === obj.commentId
      )!

      if (!obj.description) {
        (comment as any).remove()
      } else {
        comment.comment = obj.description
      }
    } else {
      task.comments.push({
        dateAdded: new Date().toString(),
        comment: obj.description || 'Comment',
        id: uuid()
      })
    }
    const newProj = await proj.save()

    return newProj.tasks.find((tsk) => tsk.id === obj.taskId)!
  }

  throw new Error('project not defined')
}

export const taskMutations = {
  createTask,
  editTask,
  deleteTask,
  dragTask,
  setSubtask,
  setComment
}
