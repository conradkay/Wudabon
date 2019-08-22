import { ReducerCases } from '../actions/types'
import { defaultState } from '../defaultState'
import { createReducer } from './createReducer'
import { TUser, TState } from '../../types/state'
import { TRegister, TLogin } from '../actions/auth'

const REGISTER = (user: TUser, action: TRegister) => {
  return action.user
}
const LOGIN = (user: TUser, action: TLogin) => {
  return action.user
}

const userCases: ReducerCases<TState['user']> = {
  REGISTER,
  LOGIN
}

/** tags will be stored in a store, tasks can select tags */
export const userReducer = createReducer<TState['user']>(
  defaultState.user,
  userCases
)
