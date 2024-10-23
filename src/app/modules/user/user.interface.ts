import { Model, Types } from 'mongoose'

export interface TUser {
  _id?: Types.ObjectId
  name: string
  email: string
  profile_pic?: string
  posts?: number
  followers?: number
  following?: number
  password: string
  phone: string
  address: string
  role: 'admin' | 'user'
}
export type TUserRoles = 'admin' | 'user'
export interface TLogin {
  email: string
  password: string
}
export interface TChangePassword {
  oldPassword: string
  newPassword: string
}
export interface UserModel extends Model<TUser> {
  encryptPassword(plainPassword: string): Promise<string>
  isValidPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
