// tslint:disable:no-unused-expression

import 'mocha'
import { fake, stub } from 'sinon'
import { expect } from 'chai'
import { cleanUpMetadata } from "inversify-express-utils";
import { GithubController } from '../../src/controllers/github.controller'

describe('GithubController', () => {
    beforeEach(() => {
        cleanUpMetadata();
    });

    const logger = {
        info: stub(),
        error: stub(),
    } as any

    it('should return repos list', async () => {
        const data = [{}];
        const service = {
            getRepos: stub().returns(Promise.resolve(data))
        };

        const controller = new GithubController(service as any, logger)
        const result = await controller.repos();

        expect(result).to.eql(data)
    })

    it('should return general info', async () => {
        const nameId = 'clarity';
        const readme = 'Clarity Readme';
        const pkg = { name: 'clarity'};

        const repoObject = stub();
        repoObject.withArgs(nameId, 'README.md').returns(Promise.resolve(readme));
        repoObject.withArgs(nameId, 'package.json').returns(Promise.resolve(pkg));

        const service = { getRepoObject: repoObject };
        const controller = new GithubController(service as any, logger)
        const result = await controller.generalInfo(nameId);

        expect(result).to.eql({readme, pkg})
    })

    it('should return commits', async () => {
        const commits = [{}];
        const nameId = 'clarity';

        const service = { getCommits: stub().withArgs(nameId).returns(Promise.resolve(commits)) };
        const controller = new GithubController(service as any, logger)
        const result = await controller.commits(nameId);

        expect(result).to.eql(commits)
    })

    it('should return patch', async () => {
        const patch = 'some patch';
        const nameId = 'clarity';
        const commitId = '324354'

        const response = {
            attachment: fake(),
            type: fake(),
            send: fake()
        };

        const service = { getCommitPatch: stub().withArgs(nameId, commitId).returns(Promise.resolve(patch)) };
        const controller = new GithubController(service as any, logger)
        await controller.patch(nameId, commitId, response as any);

        expect(response.attachment.calledWith(`${nameId}-${commitId}.patch`)).to.be.true;
        expect(response.type.calledWith('patch')).to.be.true;
        expect(response.send.calledWith(patch)).to.be.true;
    })
})
