import { model, Schema } from 'mongoose'
import { TUser, TUserRoles, UserModel } from './user.interface'
import { UserRoles } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../config'
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.encryptPassword = async function (plainPassword: string) {
  return await bcrypt.hash(plainPassword, Number(config.bcrypt_salt))
}
userSchema.pre('save', async function () {
  this.password = await User.encryptPassword(this.password)
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const User = model<TUser, UserModel>('user', userSchema)
