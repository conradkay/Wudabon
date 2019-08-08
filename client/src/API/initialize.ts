import { UserFieldsFragment } from './../graphql/types'
import { TState } from '../types/state'
import { RTDispatch } from '../types/types'
import axios from 'axios'
import { setProjectsA } from '../store/actions/project'

/**
 * occurs when user authenticates
 */

export const fetchQuery = async <T = any>(
  queryString: string,
  variables?: T
) => {
  const axiosFunc = await axios.post(
    `http://localhost:4000/graphql`,
    {
      query: queryString,
      variables
    },
    { withCredentials: true }
  )

  const data = await axiosFunc.data

  return data.data
}

export const initializeAuthState = (user: UserFieldsFragment) => {
  return (dispatch: RTDispatch, getState: () => TState) => {
    if (user && user.projects) {
      dispatch(setProjectsA(user.projects))
    }
  }
}
