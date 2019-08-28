import {ReducerCases, TAction} from '../actions/types'
import {combineReducers, Reducer} from 'redux'
import {TState} from '../../types/state'
import {createReducer} from './createReducer'
import {TOpenSnackbar} from '../actions/snackbar'
import {defaultState} from '../defaultState'
import {userReducer} from './auth'

const snackbarReducers: ReducerCases<TState['snackbar']> = {
  OPEN_SNACKBAR: (state, action: TOpenSnackbar) => {
    state.open = true
    state.message = action.message
    state.variant = action.variant
  },
  CLOSE_SNACKBAR: (state) => {
    state.open = false
  }
}

export const snackbarReducer = createReducer<TState['snackbar']>(
  defaultState.snackbar,
  snackbarReducers
)

export const reducer: Reducer<TState, TAction> = combineReducers({
  snackbar: snackbarReducer,
  user: userReducer
})
