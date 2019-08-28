import {UserModel, UserProps} from '../../models/User'
import {MutationResolvers} from '../types'
import axios from 'axios'

const buySellStock: MutationResolvers['buySellStock'] = async(
  parent,
  obj,
  context
) => {
  const user: UserProps | null = await UserModel.findOne({ id: context.userId })

  if (user) {
    const stock = user.purchasedStocks.find(
      (purchased) => purchased.symbol.toLowerCase() === obj.symbol.toLowerCase()
    )

    const purchasingStock: any = await axios.get(
      `https://financialmodellingprep.com/api/v3/company/profile/${obj.symbol.toUpperCase()}`
    )

    if (stock) {
      if(stock.amount < obj.amount) {
        obj.amount = stock.amount
      }
      user.balance -= (purchasingStock as any).data.profile.price * obj.amount

      stock.amount += obj.amount
      stock.activity.push({ date: new Date().toString(), purchase: obj.amount })
    } else {
      if(obj.amount < 1) {
        throw new Error('cant sell a stock you dont own')
      }

      user.balance -= (purchasingStock as any).data.profile.price * obj.amount

      user.purchasedStocks.push({
        purchasePriceTotal: obj.amount * purchasingStock.data.profile.price,
        symbol: obj.symbol,
        amount: obj.amount,
        name: (purchasingStock as any).data.profile.companyName || '',
        activity: [{ date: new Date().toString(), purchase: obj.amount }]
      })
    }

    await (user as any).save()

    return obj.symbol
  }

  throw new Error('Could not find user')
}

export const stockMutations = { buySellStock }
