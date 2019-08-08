import { ProjectProps } from '../../models/Project'
import { MutationResolvers } from '../types'
import { ProjectModel } from '../../models/Project'
import uuid from 'uuid'

const editList: MutationResolvers['editList'] = async (parent, obj) => {
  const project = await ProjectModel.findOne({ id: obj.projId })

  if (project) {
    const list = project.lists.find((l) => {
      return l.id === obj.listId
    })!

    list.name = obj.newList.name || list.name
    list.taskIds = obj.newList.taskIds || list.taskIds

    const newProj = await project.save()

    const pure = newProj.toObject()

    if (pure) {
      return {
        project: pure,
        list: newProj.lists.find((l) => l.id === obj.listId)!
      }
    }
  }

  throw new Error('proj not found')
}
const deleteList: MutationResolvers['deleteList'] = async (parent, obj) => {
  const project = await ProjectModel.findOne({ id: obj.projId })

  if (project && project.lists.length > 1) {
    (project.lists.find((l) => l.id === obj.id) as any).remove()

    await project.save()

    return { id: obj.id }
  } else {
    throw new Error('cant delete last list!')
  }
}

const createList: MutationResolvers['createList'] = async (parent, obj) => {
  const newId = uuid()

  const project = await ProjectModel.findOne({ id: obj.projId })

  if (project) {
    project.lists.push({
      id: newId,
      name: obj.name || 'new list',
      taskIds: []
    } as ProjectProps['lists'][0])

    const newProj = await project.save()

    const pure = newProj.toObject()

    if (pure) {
      return {
        project: pure,
        list: (newProj.lists.find((l) => l.id === newId) as any).toObject()
      }
    }
  }

  throw new Error('proj not found')
}

export const listMutations = {
  editList,
  deleteList,
  createList
}
