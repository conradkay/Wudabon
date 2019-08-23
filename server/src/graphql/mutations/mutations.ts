import { authMutations } from './auth'
import { MutationResolvers } from '../../graphql/types'
import { stockMutations } from './stock'

export const mutations: MutationResolvers = {
  ...authMutations,
  ...stockMutations
}
