import config from '../../config'
import { TLogin, TUser } from './user.interface'
import { User } from './user.model'
import jwt from 'jsonwebtoken'
const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}
const loginIntoDB = async (payload: TLogin) => {
  const { email, password } = payload
  const isEmailExists = await User.findOne({ email: email }).select('+password')
  if (!isEmailExists) {
    throw new Error('Email does not exists in Bond Pet Care')
  }
  const user = await User.findOne({ email: email }).select(
    '_id name email phone address role',
  )

  // checking password
  const hashedPassword = isEmailExists?.password
  const isValidPassword = await User.isValidPassword(password, hashedPassword)
  if (!isValidPassword) {
    throw new Error('Password is incorrect')
  }
  const jwtPayload = {
    user_email: user?.email,
    user_role: user?.role,
  }

  const userAccessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  )
  const userRefreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  )

  return {
    user,
    userAccessToken,
    userRefreshToken,
  }
}
export const UserServices = {
  registerUserIntoDB,
  loginIntoDB,
}
