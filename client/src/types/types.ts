import { TState } from './state'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TAction } from '../store/actions/types'

export type TAuthType = 'Register' | 'Login'

export type RTAction = ThunkAction<void, TState, {}, TAction>
export type RTDispatch = ThunkDispatch<TState, {}, TAction>
