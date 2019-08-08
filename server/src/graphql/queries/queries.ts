import { QueryResolvers } from '../../graphql/types'
import { ProjectModel } from '../../models/Project'

import { UserModel } from '../../models/User'

export const queries: QueryResolvers = {
  projects: async (obj, args, context, info) => {
    const projects = await ProjectModel.find({
      _id: {
        $in: args.ids
      }
    })

    return projects.map((proj) => proj.toObject()) || []
  },
  projectById: async (obj, args, context, info) => {
    const proj = await ProjectModel.findOne({ id: args.id })

    if (proj) {
      return proj.toObject()
    }

    throw new Error('proj not found')
  },
  user: async (obj, args, context) => {
    const user = await UserModel.findOne({ id: args.id })

    if (user) {
      const userWithProjects = await user.populate('projects').execPopulate()

      const newProjects = userWithProjects.projects.map((proj: any) =>
        proj.toObject()
      )

      const returning = {
        ...user.toObject(),
        projects: newProjects
      }

      return returning
    }

    throw new Error('proj not found')
  }
}
