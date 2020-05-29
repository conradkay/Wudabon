import { User } from '../sharedTypes'
import bcrypt from 'bcryptjs'
import { Document, Model, model, Schema } from 'mongoose'

export const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  profileImg: String,
  id: { type: String, required: true }
})

export const comparePassword = async (
  candidatePassword: string,
  hash: string
) => {
  return await bcrypt.compare(candidatePassword, hash)
}

export const UserModel: Model<Document & User> = model(
  'User',
  UserSchema,
  'Users'
)
