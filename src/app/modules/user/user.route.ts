import express from 'express'
import { UserControllers } from './user.controller'
import auth from '../../middlewares/auth'
import { UserRoles } from './user.constant'

const userRoutes = express.Router()

userRoutes.post('/register', UserControllers.register)
userRoutes.post('/login', UserControllers.login)
userRoutes.get(
  '/profile/:userid',
  auth(UserRoles.USER, UserRoles.ADMIN),
  UserControllers.profile,
)
userRoutes.get('/all', auth(UserRoles.ADMIN), UserControllers.allUsers)
userRoutes.post(
  '/changepassword/:userid',
  auth(UserRoles.USER, UserRoles.ADMIN),
  UserControllers.changePassword,
)

export default userRoutes
