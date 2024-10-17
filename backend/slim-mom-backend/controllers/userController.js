import { HttpError } from '../errors/HttpError.js'
import { getCategories } from './productController.js'
import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const { SECRET_KEY } = process.env;

export const calculateDailyIntake = async (req, res, next) => {
  try {
    const { height, currentWeight, age, desiredWeight, bloodType } = req.body

    const dailyCalorieIntake = 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight)
    const categories = await getCategories(bloodType);

    // update user info and calorie intake if authenticated
    try {
      const { authorization = "" } = req.headers;
      const [bearer, token] = authorization.split(" ");
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id).select('-password');

      if (user) {
        await User.findByIdAndUpdate(user._id, {
          height,
          currentWeight,
          age,
          desiredWeight,
          bloodType,
          dailyCalorieIntake
        })
      }
    } catch (ex) {
      // ignore if anonymous
    }

    res.status(200).json({
      dailyCalorieIntake,
      foodNotRecommended: categories,
    })

  } catch (ex) {
    next(new HttpError(500, 'error calculating daily intake.'))
  }
}

export const getCurrentUser = async (req, res, next) => {
  // Assuming req.user is set by verifyToken middleware
  const user = req.user

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  let foodNotRecommended = [];
  if (user.bloodType) {
    foodNotRecommended = await getCategories(user.bloodType);
  }


  const obj = {
    ...user,
    foodNotRecommended
  }
  // Send user info as a response
  res.status(200).json(obj)
}
