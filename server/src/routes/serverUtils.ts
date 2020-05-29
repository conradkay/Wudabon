import { Request, Response, NextFunction, RequestHandler } from 'express'

export interface RequestBody<Body> extends Request {
  body: Body
}

export function handler<ReqBody, resJson>(
  func: (
    req: RequestBody<ReqBody>,
    res?: Response,
    next?: NextFunction
  ) => resJson
): RequestHandler {
  return async function (
    req2: RequestBody<ReqBody>,
    res2: Response,
    next2: NextFunction
  ) {
    try {
      res2.json({ ...func(req2, res2, next2) })
    } catch (err) {
      next2(err)
    }
  }
}
