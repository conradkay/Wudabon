import {
  CreateRecipeReq,
  CreateRecipeRes,
  DeleteRecipeReq,
  DeleteRecipeRes,
  EditRecipeReq,
  EditRecipeRes
} from './../sharedTypes'
import { router } from './routes'
import { RecipeModel } from '../models/Recipe'
import { handler } from './serverUtils.js'
import uuid from 'uuid'
const RECIPE_PATH = '/recipe'
// const GET_RECIPE_LIST_PATH = '/list'
// const SEARCH_RECIPE_PATH = '/search'
const CREATE_RECIPE_PATH = '/create'
const DELETE_RECIPE_PATH = '/delete'
const EDIT_RECIPE_PATH = '/edit'

router.delete(
  RECIPE_PATH + DELETE_RECIPE_PATH,
  handler<DeleteRecipeReq, Promise<DeleteRecipeRes>>(async (req) => {
    const deleting = await RecipeModel.findOneAndDelete({
      id: req.body.id
    })
    if (deleting) {
      return { id: deleting.toObject().id }
    }
    throw new Error('database goes fuck you')
  })
)

router.post(
  RECIPE_PATH + CREATE_RECIPE_PATH,
  handler<CreateRecipeReq, Promise<CreateRecipeRes>>(async (req) => {
    const recipe = await RecipeModel.create(
      { id: uuid(), ...req.body.recipe },
      { new: true }
    )
    console.log('creating recipe... ', recipe)
    return { recipe }
  })
)

// type response mayb bayb
router.post(
  RECIPE_PATH + EDIT_RECIPE_PATH,
  handler<EditRecipeReq, Promise<EditRecipeRes>>(async (req) => {
    const recipe = await RecipeModel.findOneAndUpdate(
      { id: req.body.id },
      { id: req.body.id, ...req.body.newRecipeData },
      { new: true } // returns updated recipe ayaya
    )
    if (recipe) {
      return { recipe }
    } else {
      throw new Error('database go fuck you')
    }
  })
)

router.get(
  RECIPE_PATH,
  handler<{ id: string }, {}>(async (req) => {
    const recipe = await RecipeModel.findOne({ id: req.body.id })
    return { recipe }
  })
)
