import { UserModel, UserProps } from './../../models/User'
import { MutationResolvers } from './../types'

const buyStock: MutationResolvers['buyStock'] = async (
  parent,
  obj,
  context
) => {
  const user: UserProps | null = await UserModel.findOne({ id: context.userId })

  if (user) {
    const stock = user.purchasedStocks.find(
      (purchased) => purchased.symbol.toLowerCase() === obj.symbol.toLowerCase()
    )

    if (stock) {
    } else {
    }

    return obj.symbol
  }

  throw new Error('Could not find user')
}

const sellStock: MutationResolvers['sellStock'] = async (
  parent,
  obj,
  context
) => {
  const user: UserProps | null = await UserModel.findOne({ id: context.userId })

  if (user) {
    return obj.symbol
  }

  throw new Error('Could not find user')
}

export const stockMutations = { buyStock, sellStock }
