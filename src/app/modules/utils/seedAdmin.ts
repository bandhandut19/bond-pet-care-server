import config from '../../config'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'

const initialAdmin: TUser = {
  name: config.ADMIN_NAME as string,
  email: config.ADMIN_EMAIL as string,
  address: config.ADMIN_ADDRESS as string,
  phone: config.ADMIN_PHONE as string,
  role: config.ADMIN_ROLE as 'admin',
  password: config.ADMIN_PASSWORD as string,
}

const seedAdmin = async () => {
  const checkingDatabase = await User.findOne({ email: initialAdmin.email })

  if (!checkingDatabase) {
    const admin = new User(initialAdmin)
    await admin.save()
    console.log('Admin created Successfully')
  } else {
    console.log(
      'Initial Admin Already Exists . Kinldy Comment out the function call',
    )
  }
}
export default seedAdmin
