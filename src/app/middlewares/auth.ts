import config from '../config'
import { TUserRoles } from '../modules/user/user.interface'
import helperAsync from '../modules/utils/helperAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'

const auth = (...userRoles: TUserRoles[]) => {
  return helperAsync(async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      throw new Error(`You have no access to this route`)
    }
    const [scheme, tokenValue] = token.split(' ')
    if (scheme != 'Bearer' || !tokenValue) {
      throw new Error(`You have no access to this route`)
    }
    jwt.verify(
      tokenValue,
      config.jwt_access_secret as string,
      (err, decoded) => {
        if (err) {
          throw new Error('You have no access to this route')
        }
        const role = (decoded as JwtPayload).user_role
        if (userRoles.length && !userRoles.includes(role)) {
          throw new Error('You have no access to this route')
        }
        req.user = decoded as JwtPayload
        next()
      },
    )
  })
}

export default auth
