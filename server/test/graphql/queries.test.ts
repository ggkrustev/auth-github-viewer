/*
 * TODO: enable when declare a module for @octokit/graphql-schema
import 'mocha'
import { expect } from 'chai'
import { validate } from '@octokit/graphql-schema';
import { Repository } from '../../src/models/repository';
import { reposQuery } from '../../src/graphql/queries'

describe('GraphQL', () => {
    describe('reposQuery', () => {
        it('should use a valid schema', () => {
            const errors = validate(reposQuery());

            expect(errors).to.eql([]);
        })
    });
})
*/
