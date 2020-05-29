import { RegisterReq, RegisterRes } from './../sharedTypes'
import { UserModel, comparePassword } from '../models/User'
import { router } from './routes'
import { NextFunction, Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import uuid from 'uuid'
import bcrypt from 'bcryptjs'
import { handler } from 'src/routes/serverUtils'
import { User, LoginReq, LoginRes, UserRes } from '../sharedTypes'
const USER_ROUTE_PATH = '/user'
const USER_LOGIN_PATH = '/login'
const USER_REGISTER_PATH = '/register'
const USER_LOGOUT_PATH = '/logout'

router.post(
  USER_ROUTE_PATH + USER_LOGIN_PATH,
  handler<LoginReq, Promise<LoginRes>>(async (req, res) => {
    const userFromAuthToken: User | null = jsonwebtoken.decode(
      req.cookies['auth-token']
    ) as any
    if (userFromAuthToken) {
      req.body.email = userFromAuthToken.id
    } else if (!req.body.email) {
      throw new Error('Invalid Token')
    }

    const user = await UserModel.findOne({ email: req.body.email })

    if (user && userFromAuthToken) {
      return { user: user.toObject() }
    } else if (user) {
      const passwordMatch = await comparePassword(
        req.body.password,
        user.password!
      )
      if (passwordMatch && res) {
        const token = jsonwebtoken.sign({ id: user.id }, process.env.PRIVATE!, {
          expiresIn: '1d'
        })

        res.cookie('auth-token', token, { httpOnly: true })

        res.json({ user: user.toObject() })
      }
      throw new Error('Incorrect Password')
    }
    throw new Error('User with Email does not exist')
  })
)
// need to handle these so client can share the request type
interface UserRouteReq {
  id: string
}
router.get(
  USER_ROUTE_PATH,
  handler<UserRouteReq, Promise<UserRes>>(async (req, res, next) => {
    const data = await UserModel.findOne({ id: req.body.id })
    if (data) {
      return { user: data }
    } else {
      throw new Error('database says fuck you')
    }
  })
)

const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('auth-token')
    res.status(200)
    return { id: req.body.id } // LOL
  } catch (err) {
    next(err)
    return
  }
}

router.post(
  USER_ROUTE_PATH + USER_REGISTER_PATH,
  handler<RegisterReq, Promise<RegisterRes>>(async (request, response) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(request.body.password, salt)

    const userId = uuid()

    const registeredUser = await UserModel.create({
      password: password,
      id: userId,
      email: request.body.email,
      username: request.body.username
    })

    const registeredUserObj = registeredUser.toObject()

    const token = jsonwebtoken.sign(
      { id: registeredUserObj.id },
      process.env.PRIVATE!,
      { expiresIn: '3d' }
    )
    response!.cookie('auth-token', token, { httpOnly: true })

    return { user: registeredUserObj }
  })
)

router.post(USER_ROUTE_PATH + USER_LOGOUT_PATH, logoutUserHandler)
