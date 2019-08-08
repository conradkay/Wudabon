import { ProjectProps } from './../../models/Project'
import { AuthenticationError } from 'apollo-server-core'
import { UserModel } from './../../models/User'
import { MutationResolvers } from '../../graphql/types'
import { ProjectModel } from '../../models/Project'
import uuid from 'uuid'
const createProject: MutationResolvers['createProject'] = async (
  parent,
  args,
  context
) => {
  const creatingId = uuid()
  const colId = uuid()

  const user = await UserModel.findOne({ id: context.userId.id })

  if (user) {
    user.projects.push(creatingId)

    const [created] = await Promise.all([
      ProjectModel.create({
        id: creatingId,
        name: args.name,
        ownerId: user.id,
        users: [user.id],
        lists: [
          {
            id: colId,
            name: 'Generic',
            taskIds: []
          }
        ],
        tasks: [],
        enrolledUsers: [],
        columnOrder: [colId],
        isPrivate: false
      } as ProjectProps),
      user.save()
    ])
    if (created) {
      return created.toObject()
    }
  }

  throw new AuthenticationError('user id not provided in token')
}

const editProject: MutationResolvers['editProject'] = async (parent, args) => {
  if (args.id) {
    const project = await ProjectModel.findOne({ id: args.id })
    if (project) {
      project.name = args.newProj.name ? args.newProj.name : project.name

      const newProj = await project.save()

      if (newProj) {
        return newProj.toObject()
      }
    }
  }
  return null
}

const deleteProject: MutationResolvers['deleteProject'] = async (
  parent,
  obj
) => {
  const deleted = await ProjectModel.findByIdAndDelete(obj.id)

  if (deleted) {
    return {
      id: deleted._id
    }
  }
  throw new Error('proj not found')
}

const joinProject: MutationResolvers['joinProject'] = async () => {
  throw new Error('proj not found')
}

const leaveProject: MutationResolvers['leaveProject'] = async () => {
  throw new Error('proj not found')
}

const removeMemberFromProject: MutationResolvers['removeMemberFromProject'] = async () => {
  throw new Error('proj not found')
}

export const projectMutations = {
  createProject,
  editProject,
  deleteProject,
  joinProject,
  leaveProject,
  removeMemberFromProject
}
