import { MutationResolvers } from './../types'

const deleteRecipe: MutationResolvers['deleteRecipe'] = async (parent, obj, context) => {
  return null as any
}

const createRecipe: MutationResolvers['createRecipe'] = async (parent, obj, context) => {
  return null as any
}


export const recipeMutations = {
  deleteRecipe,
  createRecipe
}