// tslint:disable:no-unused-expression

import 'mocha'
import { fake, stub } from 'sinon'
import { expect } from 'chai'
import { AuthMiddleware } from '../../src/middlewares/auth.middleware'

describe('AuthMiddleware', () => {
    const mockResponse = () => {
        const response = {} as any
        response.json = fake()
        response.status = fake.returns(response)
        return response
    }

    it('should return 403 if no token', async () => {
        const response = mockResponse()
        const middleware = new AuthMiddleware()
        await middleware.handler({} as any, response as any, fake() as any)

        expect(response.status.calledWith(403)).to.be.true
        const resLastArg = response.json.lastCall.lastArg
        expect(resLastArg).to.be.eql({ status: 403, message: 'FORBIDDEN' })
    })
})
