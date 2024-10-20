import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import 'dotenv/config'
import { HttpError } from '../errors/HttpError.js'

const { SECRET_KEY } = process.env

const authenticateToken = async (req, _res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    return next(new HttpError(401, 'Not authorized'))
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY)

    const user = await User.findById(id).select(
      '_id name email age bloodType currentWeight dailyCalorieIntake desiredWeight height accessToken');


    if (!user || !user.accessToken) {
      return next(new HttpError(401, 'Not authorized'))
    }

    req.user = user.toObject();
    next()
  } catch {
    next(new HttpError(401, 'Not authorized'))
  }
}

export { authenticateToken }