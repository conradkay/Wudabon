export type TUser = {
  id: string
  profileImg: string
  username: string
  email: string
}

export type TUsers = {
  [id: string]: TUser
}

export type TVariant = 'success' | 'warning' | 'error' | 'standard'

export type TSnackbar = {
  open: boolean
  message: string
  variant: TVariant
}

export type TState = {
  snackbar: TSnackbar
  user: TUser | null
}
