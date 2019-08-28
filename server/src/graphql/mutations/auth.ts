import {comparePassword, UserModel, UserProps} from '../../models/User'
import bcrypt from 'bcryptjs'
import {MutationResolvers} from '../types'
import jsonwebtoken from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server-core'
import uuid from 'uuid'
import {shuffle} from 'lodash'
import axios from 'axios'

const loginWithCookie: MutationResolvers['loginWithCookie'] = async (
  parent,
  obj,
  context
) => {
  if (!context.userId) {
    throw new AuthenticationError('no token man')
  }

  const user: UserProps | null = await UserModel.findOne({
    id: context.userId
  })

  if (!user) {
    throw new AuthenticationError('Token Corrupt!')
  }

  return {
    user: {
      ...(user as any).toObject()
    }
  }
}

const login: MutationResolvers['login'] = async (parent, obj, context) => {
  const user = await UserModel.findOne({ email: obj.email })
  if (user) {
    const passwordMatch = await comparePassword(
      obj.password,
      (user as any).password
    )

    if (passwordMatch) {
      const token = jsonwebtoken.sign({ id: user.id }, process.env.PRIVATE!, {
        expiresIn: '1d'
      })

      context.res.cookie('auth-token', token, { httpOnly: true })

      return {
        user: {
          ...(user as any).toObject()
        }
      }
    }
    throw new AuthenticationError('Incorrect Password')
  }
  console.log('user in db does not exist')
  throw new AuthenticationError('User with Email does not exist!')
}

const register: MutationResolvers['register'] = async (
  parent,
  obj,
  context
) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(obj.password, salt)

  const userId = uuid()

  const randomStockSymbol = shuffle([
    'AMZN:Amazon.com Inc.',
    'MSFT:Microsoft Corporation',
    'AAPL:Apple Inc.',
    'BABA:Alibaba Group Holding Limited'
  ])[0]

  const stockPrice = await axios.get(
    'https://financialmodellingprep.com/api/v3/stock/real-time-price/' +
    randomStockSymbol.split(':')[0]
  )

  const USER_STARTING_BALANCE = 100000

  let newUser = await UserModel.create({
    password,
    id: userId,
    email: obj.email,
    username: obj.username,
    balance: USER_STARTING_BALANCE - stockPrice.data.price,
    purchasedStocks: [
      {
        symbol: randomStockSymbol.split(':')[0],
        name: randomStockSymbol.split(':')[1],
        amount: 1,
        purchasePriceTotal: stockPrice.data.price,
        activity: [{date: new Date().toString(), purchase: 1}]
      }
    ],
    profileImg:
      'https://mb.cision.com/Public/12278/2797280/879bd164c711a736_800x800ar.png'
  })

  newUser = newUser.toObject()

  if (context.res) {
    const token = jsonwebtoken.sign({ id: newUser.id }, process.env.PRIVATE!, {
      expiresIn: '1d'
    })

    context.res.cookie('auth-token', token, { httpOnly: true })
  }

  if (newUser) {
    return {
      user: {
        ...newUser
      }
    }
  } else {
    console.log('wtf the heck')
    throw new Error('email already in use')
  }
}

const logout: MutationResolvers['logout'] = async (parent, obj, context) => {
  context.res.clearCookie('auth-token')
  return { id: context.userId || '' }
}

export const authMutations = { login, register, logout, loginWithCookie }
