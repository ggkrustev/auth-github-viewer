import { inject } from 'inversify'
import { Request, Response } from 'express'
import {
    controller,
    httpPost,
    request,
    response,
    requestBody,
} from 'inversify-express-utils'
import { AuthService } from '../services/auth.service'
import DI from '../di'

@controller('/auth')
export class AuthController {
    constructor(@inject(DI.AUTH_SERVICE) private service: AuthService) {}

    @httpPost('/login')
    public async login(@requestBody() body: any, @response() res: Response) {
        const { username, password } = body

        if (!username || !password) {
            res.status(400).send('Invalid username or password!')
            return
        }

        // TODO: better create method that returns UserInstance instead of only boolean
        const validUser = await this.service.verifyUser(username, password)

        if (!validUser) {
            res.status(400).send('Invalid username or password!')
            return
        }

        const token = this.service.createToken({ email: username })

        res.status(200).json({
            token,
            user: 'John Binkley',
        })
    }

    /*
    // TODO: implement once we have:
    // - session for user
    // - public/private tokens (if needed)

    @httpPost('/logout')
    public logout(@response() res: Response) {
        res.status(501).send('Not implemented!');
    }
    */
}
