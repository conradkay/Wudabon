import { authMutations } from './auth'
import { MutationResolvers } from '../../graphql/types'
import { listMutations } from './list'
import { taskMutations } from './task'
import { projectMutations } from './project'

export const mutations: MutationResolvers = {
  ...listMutations,
  ...taskMutations,
  ...projectMutations,
  ...authMutations
}
