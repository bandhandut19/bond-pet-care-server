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

export const UserControllers = {
  register,
}
