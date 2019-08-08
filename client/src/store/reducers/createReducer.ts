import createNextState, { Draft } from 'immer'
import { Reducer } from 'redux'
import { TState } from '../../types/state'
import { TAction, ReducerCases } from '../actions/types'

/**
 * An *case reducer* is a reducer function for a speficic action type. Case
 * reducers can be composed to full reducers using `createReducer()`.
 *
 * Unlike a normal Redux reducer, a case reducer is never called with an
 * `undefined` state to determine the initial state. Instead, the initial
 * state is explicitly specified as an argument to `createReducer()`.
 *
 * In addition, a case reducer can choose to mutate the passed-in `state`
 * value directly instead of returning a new state. This does not actually
 * cause the store state to be mutated directly; instead, thanks to
 * [immer](https://github.com/mweststrate/immer), the mutations are
 * translated to copy operations that result in a new state.
 */
export type CaseReducer<S = TState, A = TAction> = (
  state: Draft<S>,
  action: A
) => S | void

/**
 * A mapping from action types to case reducers for `createReducer()`.
 */

export const createReducer = <S = TState>(
  initialState: S,
  actionsMap: ReducerCases<S>
): Reducer<S> => {
  return (state = initialState, action: TAction): S => {
    // @ts-ignore createNextState() produces an Immutable<Draft<S>>
    return createNextState(state, (draft: Draft<S>) => {
      const caseReducer = actionsMap[action.type]
      return caseReducer ? caseReducer(draft as any, action as any) : undefined
    })
  }
}
