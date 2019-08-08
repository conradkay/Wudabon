import { UserFieldsFragment } from './../../graphql/types'
import { RTDispatch } from '../../types/types'
import { TState, TAuthUser } from '../../types/state'
import { openSnackbarA } from './snackbar'
import { initializeAuthState } from '../../API/initialize'

export const transformUser = (user: UserFieldsFragment): TAuthUser => ({
  username: user.username,
  profileImg: user.profileImg || '',
  joinedIds: user.projects.map(proj =>
    typeof proj === 'string' ? proj : (proj.id as string)
  ),
  id: user.id as string,
  email: user.email
})

export const registerA = (user: UserFieldsFragment) => {
  return (dispatch: RTDispatch, getState: () => TState) => {
    if (user) {
      const authUser = transformUser(user)

      dispatch(openSnackbarA('Registered! Welcome To Mantella!', 'success'))

      dispatch({ type: 'REGISTER', user: authUser })

      dispatch(initializeAuthState(user))
    } else {
      dispatch(openSnackbarA('Could not Register', 'error'))
    }
  }
}

export const loginA = (user: UserFieldsFragment) => {
  return (dispatch: RTDispatch, getState: () => TState) => {
    if (user) {
      const authUser = transformUser(user)

      dispatch({ type: 'LOGIN', user: authUser })
      dispatch(openSnackbarA('Logged in Successfully', 'success'))

      dispatch(initializeAuthState(user))
    } else {
      dispatch(openSnackbarA('Could not Login', 'error'))
    }
  }
}

export type TRegister = {
  type: 'REGISTER'
  user: TAuthUser
}

export type TLogin = {
  type: 'LOGIN'
  user: TAuthUser
}
export type UserAction = TRegister | TLogin
