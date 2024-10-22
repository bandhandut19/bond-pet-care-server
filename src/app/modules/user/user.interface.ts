import { Model, Types } from 'mongoose'

export interface TUser {
  _id?: Types.ObjectId
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'admin' | 'user'
}
export type TUserRoles = 'admin' | 'user'

export interface UserModel extends Model<TUser> {
  encryptPassword(plainPassword: string): Promise<string>
}
