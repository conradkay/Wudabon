import {authMutations} from './auth'
import {MutationResolvers} from '../types'
import {stockMutations} from './stock'

export const mutations: MutationResolvers = {
  ...authMutations,
  ...stockMutations
}
