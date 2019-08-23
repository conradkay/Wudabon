import { UserModel, UserProps } from './../../models/User'
import { MutationResolvers } from './../types'
import axios from 'axios'

const buySellStock: MutationResolvers['buyStock'] = async (
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
      stock.amount += obj.amount
      stock.activity.push({ date: new Date().toString(), purchase: obj.amount })
    } else {
      const purchasingStock = await axios.get(
        `https://financialmodellingprep.com/api/v3/company/profile/${obj.symbol.toUpperCase()}`
      )

      user.purchasedStocks.push({
        symbol: obj.symbol,
        amount: obj.amount,
        name: (purchasingStock as any).companyName || '',
        activity: [{ date: new Date().toString(), purchase: obj.amount }]
      })
    }

    await (user as any).save()

    return obj.symbol
  }

  throw new Error('Could not find user')
}

export const stockMutations = { buySellStock }
