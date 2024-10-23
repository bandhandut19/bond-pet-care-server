import config from '../../config'
import { TChangePassword, TLogin, TUser } from './user.interface'
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

const getProfileFromDB = async (userId: string) => {
  const result = await User.findById(userId).select('-password')
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find().select('-password')
  return result
}
const changePasswordIntoDB = async (
  userId: string,
  payload: TChangePassword,
) => {
  const { oldPassword, newPassword } = payload
  const user = await User.findById(userId).select('+password')
  if (!user) {
    throw new Error('User not found in Bond Pet Care')
  }
  const currentPassword = user?.password
  //checking old password
  const isOldPasswordValid = await User.isValidPassword(
    oldPassword,
    currentPassword,
  )
  if (!isOldPasswordValid) {
    throw new Error('Old Password is incorrect')
  }

  const newEncryptedPassword = await User.encryptPassword(newPassword)

  const result = await User.findByIdAndUpdate(userId, {
    password: newEncryptedPassword,
  })
  return result
}
export const UserServices = {
  registerUserIntoDB,
  loginIntoDB,
  getProfileFromDB,
  getAllUsersFromDB,
  changePasswordIntoDB,
}
