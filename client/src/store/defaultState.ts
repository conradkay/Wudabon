import { TSnackbar } from '../types/state'

import { TState } from '../types/state'

export const defaultSnackbar: TSnackbar = {
  open: false,
  message: "YOU CAN'T SEE ME! BAM DAM WHAN CHAM, Boo do do dodo doooo",
  variant: 'success'
}

export const defaultState: TState = {
  user: null,
  snackbar: defaultSnackbar
}
