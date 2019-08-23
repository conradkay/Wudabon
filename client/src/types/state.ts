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
  purchasePrice: number
  purchaseDate: string
  symbol: string
  name: string
  amount: number
  activity: Array<{date: string, purchase: number}>
}

export type TState = {
  snackbar: TSnackbar
  user: TUser | null
}
