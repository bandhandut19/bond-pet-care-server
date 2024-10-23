import express from 'express'
import { UserControllers } from './user.controller'

const userRoutes = express.Router()

userRoutes.post('/register', UserControllers.register)
userRoutes.post('/login', UserControllers.login)
userRoutes.get('/profile/:userid', UserControllers.profile)
userRoutes.get('/all', UserControllers.allUsers)
userRoutes.post('/changepassword/:userid', UserControllers.changePassword)

export default userRoutes
