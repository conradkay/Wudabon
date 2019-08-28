import {UserFieldsFragment} from '../../graphql/types'
import {RTDispatch} from '../../types/types'
import {TUser} from '../../types/state'
import {openSnackbarA} from './snackbar'
import {initializeAuthState} from '../../API/initialize'

export const registerA = (user: UserFieldsFragment) => {
  return (dispatch: RTDispatch) => {
    if (user) {
      const authUser = user

      dispatch(openSnackbarA('Registered! Welcome To Mantella!', 'success'))

      dispatch({ type: 'REGISTER', user: authUser } as any)

      dispatch(initializeAuthState(user))
    } else {
      dispatch(openSnackbarA('Could not Register', 'error'))
    }
  }
}

export const loginA = (user: UserFieldsFragment) => {
  return (dispatch: RTDispatch) => {
    if (user) {
      dispatch({type: 'LOGIN', user: user} as any)
      dispatch(openSnackbarA('Logged in Successfully', 'success'))

      dispatch(initializeAuthState(user))
    } else {
      dispatch(openSnackbarA('Could not Login', 'error'))
    }
  }
}

export type TRegister = {
  type: 'REGISTER'
  user: TUser
}

export type TLogin = {
  type: 'LOGIN'
  user: TUser
}
export type UserAction = TRegister | TLogin
