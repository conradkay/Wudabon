import {UserModel} from '../../models/User'
import {PortfolioStock, QueryResolvers} from '../types'
import axios from 'axios'
import {isArray} from 'lodash'

const purchasedStocks: QueryResolvers['purchasedStocks'] = async(
  parent,
  obj,
  context
) => {
  const user = await UserModel.findOne({id: context.userId})

  if(user) {
    const purchasedSymbolsNames = user.purchasedStocks.reduce((accum, item) => {
      return [...accum, [item.symbol, item.name]]
    }, [])

    const purchased: {
      data: Array<{ price: number; symbol: string }>
    } = await axios.get(
      `https://financialmodellingprep.com/api/v3/stock/real-time-price/${purchasedSymbolsNames
      .map((f) => f[0])
      .toString()}`
    )

    if(!purchased) {
      throw new Error('API is down, not my fault even')
    }

    if(!isArray(purchased.data)) {
      purchased.data = [{...(purchased.data as any)}]
    }

    const result: PortfolioStock[] = []

    purchasedSymbolsNames.map((purchasedSymbol) => {
      const s = purchased.data.find((item) => {
        return item.symbol.toUpperCase() === purchasedSymbol[0].toUpperCase()
      })!

      result.push({
        price: s.price,
        symbol: s.symbol,
        name: purchasedSymbol[1]
      })
    })

    return result
  }

  throw new Error('oops')
}

export const stockQueries = {purchasedStocks}
