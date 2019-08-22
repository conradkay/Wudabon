import { authMutations } from './auth'
import { MutationResolvers } from '../../graphql/types'

export const mutations: MutationResolvers = {
  ...authMutations
}
