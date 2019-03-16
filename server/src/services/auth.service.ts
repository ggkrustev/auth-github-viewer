import { inject, injectable } from 'inversify'
import { sign, verify, SignOptions } from 'jsonwebtoken'
import { AuthConfig } from '../config/interfaces'
import { TokenPayload } from '../models/token-payload'
import DI from '../di'

@injectable()
export class AuthService {
    private static readonly DEFAULT_SIGN_OPTIONS: SignOptions = {
        algorithm: 'HS256',
        expiresIn: '7d',
    }

    private readonly signOptions: SignOptions
    private readonly secret: string

    constructor(@inject(DI.AUTH_CONFIG) private config: AuthConfig) {
        this.secret = config.secret
        this.signOptions = {
            algorithm:
                config.algorithm || AuthService.DEFAULT_SIGN_OPTIONS.algorithm,
            expiresIn:
                config.expiresIn || AuthService.DEFAULT_SIGN_OPTIONS.expiresIn,
            issuer: config.issuer,
            subject: config.subject,
            audience: config.audience,
        }
    }

    public createToken(payload: TokenPayload): string {
        return sign(payload, this.secret, this.signOptions)
    }

    public verifyToken(token: string): any {
        try {
            return verify(token, this.secret, this.signOptions)
        } catch (err) {
            // TODO: Log verification error
            return null
        }
    }

    /**
     * Verify user using static data
     *
     * TODO: implement before go in production
     */
    public async verifyUser(
        username: string,
        password: string
    ): Promise<boolean> {
        if (username === 'john@vmware.com' && password === '123456') {
            return true
        }

        return false
    }
}
