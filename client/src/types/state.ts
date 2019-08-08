import { TProject } from './project'

export type TStopWatch = {
  pastTimes: number[]
  time: number
  paused: boolean
  highest: number
}

export type TPomodoro = {
  paused: boolean
  working: boolean // if false we are in break
  currSeconds: number
  breakSeconds: number
  workSeconds: number
  selectingTask: boolean
  selectedTaskId: null | string
  stopWatch: TStopWatch
}

export type TProfile = {
  id: string
  profileImg: string
  username: string
  joinedIds: string[]
  email: string
}

export type TProfiles = {
  [id: string]: TProfile
}

export type TVariant = 'success' | 'warning' | 'error' | 'standard'

export type TSnackbar = {
  open: boolean
  message: string
  variant: TVariant
}

export type TAuthUser = TProfile

export type TState = {
  snackbar: TSnackbar
  isLoading: boolean
  pomodoro: TPomodoro
  user: TAuthUser | null
  projects: TProject[]
}
