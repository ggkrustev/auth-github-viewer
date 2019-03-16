import 'mocha'
import { expect } from 'chai'
import { Commit } from '../../src/models/commit'
import { Repository } from '../../src/models/repository'
import {
    mapToCommit,
    mapToRepos,
    mapObjectToText,
} from '../../src/graphql/mappings'

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

    describe('mapToCommit', () => {
        it('should map nodes to Commit model', () => {
            const data = {
                repository: {
                    ref: {
                        target: {
                            history: {
                                edges: [
                                    {
                                        node: {
                                            messageHeadline:
                                                'Align Legend to center.',
                                            oid:
                                                '8d26e98ec57bb2223d0c8aedc2514751d3f98f54',
                                            message:
                                                'Align Legend to center.',
                                            author: {
                                                name:
                                                    'Pantaley Stoyanov',
                                                email:
                                                    'pstoyanov@prevalent.net',
                                                date:
                                                    '2018-10-18T17:38:07.000+03:00',
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            }

            const expected = [
                {
                    id: '8d26e98ec57bb2223d0c8aedc2514751d3f98f54',
                    comment: 'Align Legend to center.',
                    contributor: 'pstoyanov@prevalent.net',
                    date: '2018-10-18T17:38:07.000+03:00',
                },
            ] as Commit[]

            expect(mapToCommit(data)).to.eql(expected)
        })
    })
})
