import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer } from './reducers/reducer'
import { defaultState } from './defaultState'
import { TState } from '../types/state'
import { TAction } from './actions/types'
import invariant from 'redux-immutable-state-invariant'

const actionCreators: any[] = []

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 100
})

export const store: Store<TState, TAction> = createStore(
  reducer,
  defaultState,
  composeEnhancers(applyMiddleware(invariant(), thunk))
)
