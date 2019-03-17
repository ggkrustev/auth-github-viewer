// tslint:disable:no-unused-expression

import 'mocha'
import { fake, stub } from 'sinon'
import { expect } from 'chai'
import { cleanUpMetadata } from "inversify-express-utils";
import { AuthController } from '../../src/controllers/auth.controller'
import { AuthPayload } from '../../src/models/auth-payload'

describe('AuthController', () => {
    beforeEach(() => {
        cleanUpMetadata()
    })

    const logger = {
        info: stub(),
        error: stub(),
    } as any

    const mockResponse = () => {
        const response = {} as any
        response.json = fake()
        response.send = fake()
        response.status = fake.returns(response)
        return response
    }

    it('should return 400 if no user or password', async () => {
        const response = mockResponse()
        const controller = new AuthController({} as any, logger)
        await controller.login({} as any, response as any)

        expect(response.status.calledWith(400)).to.be.true
        expect(
            response.send.calledWith('Invalid username or password!')
        ).to.be.true
    })

    it('should return 400 if no user instance', async () => {
        const response = mockResponse()
        const service = { verifyUser: stub().returns(false) }
        const controller = new AuthController(service as any, logger)
        await controller.login({} as any, response as any)

        expect(response.status.calledWith(400)).to.be.true
        expect(
            response.send.calledWith('Invalid username or password!')
        ).to.be.true
    })

    it('should return token and user info', async () => {
        const response = mockResponse()
        const token = 'gfioruj23kn2kfjdl'

        const createToken = fake.returns(token)
        const service = {
            createToken,
            verifyUser: stub().returns(true),
        }
        const controller = new AuthController(service as any, logger)

        const body = {
            username: 'john',
            password: '123456',
        } as AuthPayload
        await controller.login(body, response as any)

        const tokenLastArg = createToken.lastCall.lastArg
        expect(tokenLastArg).to.be.eql({ email: body.username })

        expect(response.status.calledWith(200)).to.be.true

        const resLastArg = response.json.lastCall.lastArg
        expect(resLastArg).to.be.eql({ token, user: 'John Binkley' })
    })
})
