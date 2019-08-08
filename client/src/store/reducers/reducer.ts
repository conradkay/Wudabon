import { projectsReducer } from './projects'
import { pomodoroReducer } from './pomodoro'
import { TAction } from '../actions/types'
import { Reducer, combineReducers } from 'redux'
import { TState } from '../../types/state'
import { ReducerCases } from '../actions/types'
import { createReducer } from './createReducer'
import { TStartLoading, TStopLoading } from '../actions/loading'
import { TOpenSnackbar } from '../actions/snackbar'
import { defaultState } from '../defaultState'
import { userReducer } from './user'

const snackbarReducers: ReducerCases<TState['snackbar']> = {
  OPEN_SNACKBAR: (state, action: TOpenSnackbar) => {
    state.open = true
    state.message = action.message
    state.variant = action.variant
  },
  CLOSE_SNACKBAR: (state, action) => {
    state.open = false
  }
}

export const snackbarReducer = createReducer<TState['snackbar']>(
  defaultState.snackbar,
  snackbarReducers
)

const loadingReducers: ReducerCases<boolean> = {
  START_LOADING: (state, action: TStartLoading) => true,
  STOP_LOADING: (state, action: TStopLoading) => false
}

const loadingReducer = createReducer<boolean>(false, loadingReducers)

export const reducer: Reducer<TState, TAction> = combineReducers({
  isLoading: loadingReducer,
  snackbar: snackbarReducer,
  projects: projectsReducer,
  pomodoro: pomodoroReducer,
  user: userReducer
})
