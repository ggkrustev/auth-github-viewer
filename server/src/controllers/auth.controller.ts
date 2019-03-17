import { inject } from 'inversify'
import { Request, Response } from 'express'
import {
    controller,
    httpPost,
    request,
    response,
    requestBody,
} from 'inversify-express-utils'
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationPost,
} from 'swagger-express-ts'
import { AuthService } from '../services/auth.service'
import { AuthPayload } from '../models/auth-payload'
import { LoginData } from '../models/login-data'
import DI from '../di'

@ApiPath({
    path: '/auth',
    name: 'Authentication',
})
@controller('/auth')
export class AuthController {
    constructor(@inject(DI.AUTH_SERVICE) private service: AuthService) {}

    @ApiOperationPost({
        path: '/login',
        description: 'Get a JWT token after authenticate',
        parameters: {
            body: {
                description: 'User credentials',
                model: 'AuthPayload',
                required: true,
            },
        },
        responses: {
            200: {
                description: 'User is authenticated and gets authorization JWT',
            },
            400: {},
        },
    })
    @httpPost('/login')
    public async login(
        @requestBody() body: AuthPayload,
        @response() res: Response
    ) {
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
        } as LoginData)
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
