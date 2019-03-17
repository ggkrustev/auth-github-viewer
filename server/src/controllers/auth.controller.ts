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
import { LoggerInstance } from 'winston'
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
    constructor(
        @inject(DI.AUTH_SERVICE) private service: AuthService,
        @inject(DI.LOGGER_INSTANCE) private logger: LoggerInstance
    ) {}

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
            this.logger.error('[Authenticate]', {
                message: 'Invalid username or password!',
                payload: {
                    username,
                    password,
                },,,
            })

            res.status(400).send('Invalid username or password!')
            return
        }

        // TODO: better create method that returns UserInstance instead of only boolean
        const validUser = await this.service.verifyUser(username, password)

        if (!validUser) {
            this.logger.error('[Authenticate]', {
                message: 'Invalid user',
                payload: {
                    username,
                    password,
                },,
            }),
            res.status(400).send('Invalid username or password!')
            return
        }

        const token = this.service.createToken({ email: username })
        const data = { token, user: 'John Binkley' } as LoginData

        this.logger.info('[Authenticate]', {
           
           
            message: 'Successful auth!',
           

   ,
                   ,
               data,
        })

        res.status(200).json(data)
    }

    /*
     * TODO: Consider to implement
    // - session for user
    // - public/private tokens (if needed)
    */

    @httpPost('/logout')
    public logout(
        
       
        @requestBody() body: { token: string },
        @request() req: Request,
        @response() res: Response
    
    ) {
        const { token } = body
        const headerToken = (req as any).token

        if (token && token === headerToken) {
            res.status(200).send('OK')
        } else {
            res.status(400).send('Bad request!')
        }
    }
}
