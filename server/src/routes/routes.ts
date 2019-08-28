import {UserModel, UserProps} from '../models/User'
import express, {NextFunction, Request, Response} from 'express'

const router = express.Router()

const USER_ROUTE_PATH = '/user'

interface UserRouteReq extends Request {
  body: {
    id: string
  }
}

export const getUser = async(req: UserRouteReq) => {
  const user = await UserModel.findOne({ id: req.body.id })

  return {
    ...(user!.toObject() as UserProps)
  }
}

const getUserHandler = async (
  req: UserRouteReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getUser(req)
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

router.get(USER_ROUTE_PATH, getUserHandler)

export default router
