import { UserAction } from './auth'
import { SnackbarAction } from './snackbar'

export type TAction = Readonly<SnackbarAction | UserAction>

export type ActionTypes = TAction['type']

export type ReducerCases<State> = {
  [actionCase in ActionTypes]?: (state: State, action: TAction) => void
}
