import { authMutations } from './auth'
import { MutationResolvers } from '../types'
import { recipeMutations } from './recipe'

export const mutations: MutationResolvers = {
  ...authMutations,
  ...recipeMutations
}
