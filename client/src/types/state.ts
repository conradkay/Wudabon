export type TUser = {
  id: string
  profileImg: string
  username: string
  email: string

  balance: number
  purchasedStocks: TPurchasedStock[]
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

export type TPurchasedStock = {
  purchaseDate: string
  purchasePrice: number
  symbol: string
  name: string // not necessary i guess
}

export type TState = {
  snackbar: TSnackbar
  user: TUser | null
}
