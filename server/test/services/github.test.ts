import 'mocha'
import { stub } from 'sinon'
import { expect } from 'chai'
import { GraphQLClient } from 'graphql-request'
import { GithubService } from '../../src/services/github.service'

describe('GithubService', async () => {
    const stubClient = (data: any) => ({
        request: stub().returns(Promise.resolve(data)),
    })

    const stubPatchService = (data: string) => ({
        getPatch: stub().returns(Promise.resolve(data)),
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

        const service = new GithubService(
            client as any,
            stubPatchService('') as any
        )
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
        const service = new GithubService(
            client as any,
            stubPatchService('') as any
        )
        const result = await service.getRepoObject('clarity', 'readme')

        expect(result).to.equal(expectedText)
    })

    it('should return commits history', async () => {
        const edges = [
            {
                node: {
                    messageHeadline: 'Align Legend to center.',
                    oid: '8d26e98ec57bb2223d0c8aedc2514751d3f98f54',
                    message: 'Align Legend to center.',
                    author: {
                        name: 'Pantaley Stoyanov',
                        email: 'pstoyanov@prevalent.net',
                        date: '2018-10-18T17:38:07.000+03:00',
                    },
                },
            },
        ]

        const client = stubClient({
            repository: {
                ref: {
                    target: {
                        history: {
                            edges,
                        },
                    },
                },
            },
        })

        const service = new GithubService(
            client as any,
            stubPatchService('') as any
        )
        const expected = [
            {
                id: '8d26e98ec57bb2223d0c8aedc2514751d3f98f54',
                comment: 'Align Legend to center.',
                contributor: 'pstoyanov@prevalent.net',
                date: '2018-10-18T17:38:07.000+03:00',
            },
        ]

        const result = await service.getCommits('clarity')

        expect(result).to.eql(expected)
    })

    it('should return single commit patch', async () => {
        const expectedPatch = 'some text'

        const patchService = stubPatchService(expectedPatch) as any
        const service = new GithubService(
            stubClient({}) as any,
            patchService
        )
        const result = await service.getCommitPatch('clarity', '8d26e98ec')

        expect(result).to.equal(expectedPatch)
    })
})
