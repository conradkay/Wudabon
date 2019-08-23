import bcrypt from 'bcryptjs'
import { Schema, model, Model, Document } from 'mongoose'

export const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  profileImg: String,
  id: { type: String, required: true },
  purchasedStocks: [
    {
      purchasePrice: { type: Number, required: true },
      purchaseDate: { type: String, required: true },
      symbol: { type: String, required: true },
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      activity: [
        {
          date: { type: String, required: true },
          purchase: { type: String, required: true }
        }
      ]
    }
  ]
})

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email })
}

export const getUserById = async (id: string) => {
  return await UserModel.findOne({ id: id })
}

export const comparePassword = async (
  candidatePassword: string,
  hash: string
) => {
  return await bcrypt.compare(candidatePassword, hash)
}

export interface UserProps {
  email: string
  password: string
  username: string
  profileImg?: string
  id: string

  balance: number
  purchasedStocks: Array<{
    purchaseDate: string
    purchasePrice: number
    symbol: string
    name: string
    activity: Array<{ date: string; purchase: number }>
  }>
}

export const UserModel: Model<Document & UserProps> = model(
  'User',
  UserSchema,
  'Users'
)
