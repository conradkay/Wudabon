import { UserFieldsFragment } from '../graphql/types'
import { TState } from '../types/state'
import { RTDispatch } from '../types/types'

// noinspection JSUnusedLocalSymbols
export const initializeAuthState = (user: UserFieldsFragment) => {
  // noinspection JSUnusedLocalSymbols
  return (dispatch: RTDispatch, getState: () => TState) => {}
}
