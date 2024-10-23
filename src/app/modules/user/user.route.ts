import express from 'express'
import { UserControllers } from './user.controller'

const userRoutes = express.Router()

userRoutes.post('/register', UserControllers.register)
userRoutes.post('/login', UserControllers.login)
userRoutes.get('/profile/:userid', UserControllers.profile)
userRoutes.get('/all', UserControllers.allUsers)

export default userRoutes
