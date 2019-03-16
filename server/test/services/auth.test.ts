import 'mocha'
import { stub } from 'sinon'
import { expect } from 'chai'
import { verify } from 'jsonwebtoken'
import { AuthService } from '../../src/services/auth.service'

describe('AuthService', async () => {
    it('should generate jwt token', async () => {
        const authConfig = {
            audience: 'https://www.vmware.com',
            issuer: 'VMWare',
            subject: 'admin@vmware.com',
            secret:
                'MIIBOQIBAAJBAIdJvHY0F7NcTCW0FLpaE3+6pLkq5iTPXKbqQlsEyj0Bf8NYxF48taxMpTEKyFCI7fqNAHYgZzzujLdTeriAxG8CAwEAAQJAYEESGXeOtUoh02GAreWQofwFXskq3V27qfZaJ7AMw8HQSZcQEjLh5nuIgZX8w3pLZJsL4PXqPouKf1yvixMJAQIhAO52mNtYObHAxoljyw9+ZeEDBK0bH/8Kudt8wn0D8xFPAiEAkTy4vegxxRT6fFu9kV7plbPVzTIDLbB42oslXa0pEuECID+MWXXy0AU/w2jvsDijzZCmVkOve9piyF7mo4nfWJJfAiB3xrwU4gkpn8N0C7SqzruU2lrYfwZgB8mjcl2+g6/8AQIgJJitU4s+EtFRM+8u6aclp6435pPqx620cXrBrZOWuTY=',
        }

        const payload = {
            email: 'user@clarity',
        }

        const service = new AuthService(authConfig as any)
        const token = service.createToken(payload)
        const decoded = verify(token, authConfig.secret) as any

        expect(decoded.email).to.equal(payload.email)
        expect(decoded.aud).to.equal(authConfig.audience)
        expect(decoded.iss).to.equal(authConfig.issuer)
        expect(decoded.sub).to.equal(authConfig.subject)
    })

    it('should verify jwt token', async () => {
        const authConfig = {
            audience: 'https://www.vmware.com',
            issuer: 'VMWare',
            subject: 'admin@vmware.com',
            secret:
                'MIIBOQIBAAJBAIdJvHY0F7NcTCW0FLpaE3+6pLkq5iTPXKbqQlsEyj0Bf8NYxF48taxMpTEKyFCI7fqNAHYgZzzujLdTeriAxG8CAwEAAQJAYEESGXeOtUoh02GAreWQofwFXskq3V27qfZaJ7AMw8HQSZcQEjLh5nuIgZX8w3pLZJsL4PXqPouKf1yvixMJAQIhAO52mNtYObHAxoljyw9+ZeEDBK0bH/8Kudt8wn0D8xFPAiEAkTy4vegxxRT6fFu9kV7plbPVzTIDLbB42oslXa0pEuECID+MWXXy0AU/w2jvsDijzZCmVkOve9piyF7mo4nfWJJfAiB3xrwU4gkpn8N0C7SqzruU2lrYfwZgB8mjcl2+g6/8AQIgJJitU4s+EtFRM+8u6aclp6435pPqx620cXrBrZOWuTY=',
        }

        const payload = {
            email: 'user@clarity',
        }

        const service = new AuthService(authConfig as any)
        const token = service.createToken(payload)
        const decoded = service.verifyToken(token)

        expect(decoded.email).to.equal(payload.email)
        expect(decoded.aud).to.equal(authConfig.audience)
        expect(decoded.iss).to.equal(authConfig.issuer)
        expect(decoded.sub).to.equal(authConfig.subject)
    })

    it('should return null if invalid token', async () => {
        const authConfig = {
            audience: 'https://www.vmware.com',
            issuer: 'VMWare',
            subject: 'admin@vmware.com',
            secret:
                'MIIBOQIBAAJBAIdJvHY0F7NcTCW0FLpaE3+6pLkq5iTPXKbqQlsEyj0Bf8NYxF48taxMpTEKyFCI7fqNAHYgZzzujLdTeriAxG8CAwEAAQJAYEESGXeOtUoh02GAreWQofwFXskq3V27qfZaJ7AMw8HQSZcQEjLh5nuIgZX8w3pLZJsL4PXqPouKf1yvixMJAQIhAO52mNtYObHAxoljyw9+ZeEDBK0bH/8Kudt8wn0D8xFPAiEAkTy4vegxxRT6fFu9kV7plbPVzTIDLbB42oslXa0pEuECID+MWXXy0AU/w2jvsDijzZCmVkOve9piyF7mo4nfWJJfAiB3xrwU4gkpn8N0C7SqzruU2lrYfwZgB8mjcl2+g6/8AQIgJJitU4s+EtFRM+8u6aclp6435pPqx620cXrBrZOWuTY=',
        }

        const payload = {
            email: 'user@clarity',
        }

        const service = new AuthService(authConfig as any)
        const fakeToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fyJlbWFpbCI6InVzZXJAY2xhcml0eSIsInBhc3N3b3JkIjoiZjMyNDMyNCIsImlhdCI6MTU1Mjc3NzM4MywiZXhwIjoxNTUzMzgyMTgzLCJhdWQiOiJodHRwczovL3d3dy52bXdhcmUuY29tIiwiaXNzIjoiVk1XYXJlIiwic3ViIjoiYWRtaW5Adm13YXJlLmNvbSJ9.hFxvTB0kW0wzRWnWtOgKj99QJ4sZsksRnXmB5epjdVM'
        const decoded = service.verifyToken(fakeToken)

        expect(decoded).to.equal(null)
    })

    it('should verify user', async () => {
        // TODO: remove or reimplement before go into production

        const username = 'john@vmware.com'
        const password = '123456'

        const service = new AuthService({} as any)

        expect(await service.verifyUser(username, password)).to.be.equal(true)
        expect(await service.verifyUser(username, 'wrong pass')).to.be.equal(
            false
        )
    })
})
