import {authMutations} from './auth'
import {MutationResolvers} from '../types'

export const mutations: MutationResolvers = {
  ...authMutations
}
