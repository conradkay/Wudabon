import { TVariant } from '../../types/state'

export type TOpenSnackbar = {
  type: 'OPEN_SNACKBAR'
  message: string
  variant: TVariant
}
export type TCloseSnackbar = { type: 'CLOSE_SNACKBAR' }

export type SnackbarAction = TOpenSnackbar | TCloseSnackbar

export const closeSnackbarA = (): TCloseSnackbar => ({
  type: 'CLOSE_SNACKBAR'
})

export const openSnackbarA = (
  message: string,
  variant: TVariant
): TOpenSnackbar => ({
  type: 'OPEN_SNACKBAR',
  message,
  variant
})
