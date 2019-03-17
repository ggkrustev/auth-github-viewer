import { injectable, inject } from 'inversify'
import { BaseMiddleware } from 'inversify-express-utils'
import { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import DI from '../di'

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    @inject(DI.AUTH_SERVICE) private readonly service: AuthService
    public handler(req: Request, res: Response, next: NextFunction) {
        const token = (req as any).token

        if (!token) {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN',
            })
        }

        const decoded = this.service.verifyToken(token)

        if (!decoded) {
            return res.status(401).json({
                status: 401,
                message: 'UNAUTHORIZED',
            })
        }

        next()
    }
}
