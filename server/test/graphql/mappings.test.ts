import 'mocha'
import { expect } from 'chai'
import { Repository } from '../../src/models/repository'
import { mapToRepos, mapObjectToText } from '../../src/graphql/mappings'

describe('GraphQL nodes to models mapping', () => {
    describe('mapToRepos', () => {
        it('should map nodes to Array<Repository>', () => {
            const nodes = [
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

            const expected = [
                {
                    name: 'clarity',
                    license: 'Other',
                    branches: 30,
                    commits: 926,
                    releases: 136,
                },
            ] as Repository[]

            expect(mapToRepos(nodes)).to.eql(expected)
        })
    })

    describe('mapObjectToText', () => {
        it('should extract text from repository.object blob', () => {
            const expected = 'some text'
            const data = {
                repository: {
                    object: {
                        text: expected,
                    },
                },
            }

            expect(mapObjectToText(data)).to.equal(expected)
        })
    })
})
