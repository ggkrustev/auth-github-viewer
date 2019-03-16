import 'mocha'
import { stub } from 'sinon'
import { expect } from 'chai'
import { GraphQLClient } from 'graphql-request'
import { GithubService } from '../../src/services/github.service'

describe('GithubService', async () => {
    const stubClient = (data: any) => ({
        request: stub().returns(Promise.resolve(data)),
    })

    it('should return a list of repos', async () => {
        const edges = [
            {
                node: {
                    name: 'clarity',
                    licenseInfo: {
                        name: 'Other',
                    },
                    refs: {
                        totalCount: 30,
                    },
                    ref: {
                        target: {
                            history: {
                                totalCount: 926,
                            },
                        },
                    },
                    releases: {
                        totalCount: 136,
                    },
                },
            },
        ]

        const client = stubClient({
            organization: {
                pinnedRepositories: {
                    edges,
                },
            },
        })

        const service = new GithubService(client as any)
        const expected = [
            {
                name: 'clarity',
                license: 'Other',
                branches: 30,
                commits: 926,
                releases: 136,
            },
        ]

        const result = await service.getRepos()

        expect(result).to.eql(expected)
    })

    it('should return general info for repo', async () => {
        const expectedText = 'some text'
        const data = {
            repository: {
                object: {
                    text: expectedText,
                },
            },
        }

        const client = stubClient(data)
        const service = new GithubService(client as any)
        const result = await service.getRepoObject('clarity', 'readme')

        expect(result).to.equal(expectedText)
    })
})
