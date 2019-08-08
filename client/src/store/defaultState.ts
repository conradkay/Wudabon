import { TSnackbar } from '../types/state'

import { TState } from '../types/state'

export const defaultSnackbar: TSnackbar = {
  open: false,
  message: "YOU CAN'T SEE ME! BAM DAM WHAN CHAM, Boo do do dodo doooo",
  variant: 'success'
}

export const defaultState: TState = {
  user: null,
  pomodoro: {
    paused: true,
    working: true,
    selectingTask: false,
    selectedTaskId: null,
    currSeconds: 60 * 25, // will be reset to startSeconds when they click start either way
    breakSeconds: 60 * 5,
    workSeconds: 60 * 25,
    stopWatch: {
      pastTimes: [],
      time: 0,
      paused: true,
      highest: 0
    }
  },
  snackbar: defaultSnackbar,
  isLoading: false,
  projects: []
}
