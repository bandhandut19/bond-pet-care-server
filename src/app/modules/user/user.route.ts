import express from 'express'
import { UserControllers } from './user.controller'

const userRoutes = express.Router()

userRoutes.post('/register', UserControllers.register)

export default userRoutes
