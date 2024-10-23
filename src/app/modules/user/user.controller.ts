import helperAsync from '../utils/helperAsync'
import { UserServices } from './user.service'

const register = helperAsync(async (req, res, next) => {
  const payload = req.body

  try {
    const result = await UserServices.registerUserIntoDB(payload)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No Data Found',
        data: [],
      })
    }

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    })
  } catch (error: any) {
    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})

const login = helperAsync(async (req, res, next) => {
  try {
    const payload = req.body
    const result = await UserServices.loginIntoDB(payload)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No Data Found',
        data: [],
      })
    }
    // setting jwt tokens in cookies
    const { userAccessToken, userRefreshToken, user } = result
    res.cookie('refreshToken', userRefreshToken, {
      httpOnly: true,
    })
    res.cookie('accessToken', userAccessToken, {
      httpOnly: true,
    })
    return res.status(201).json({
      success: true,
      message: 'User Logged In Successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})

const profile = helperAsync(async (req, res, next) => {
  const userId = req.params.userid
  try {
    const result = await UserServices.getProfileFromDB(userId)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No User Found',
        data: [],
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User Profile Retrived Successfully',
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})
const allUsers = helperAsync(async (req, res, next) => {
  try {
    const result = await UserServices.getAllUsersFromDB()
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No User Found',
        data: [],
      })
    }
    return res.status(200).json({
      success: true,
      message: 'All Users Retrived Successfully',
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})
const changePassword = helperAsync(async (req, res, next) => {
  try {
    const userid = req.params.userid
    const payload = req.body
    const result = await UserServices.changePasswordIntoDB(userid, payload)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Password Change was unsuccessfull',
        data: [],
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Password Changed Successfully',
      data: result,
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})
export const UserControllers = {
  register,
  login,
  profile,
  allUsers,
  changePassword,
}
