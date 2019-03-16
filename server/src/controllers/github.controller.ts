import { inject } from 'inversify'
import { Response } from 'express'
import {
    controller,
    httpGet,
    response,
    requestParam,
} from 'inversify-express-utils'
import { GithubService } from '../services/github.service'
import { GeneralInfo } from '../models/general-info'
import { Repository } from '../models/repository'
import { Commit } from '../models/commit'
import DI from '../di'

@controller('/api')
export class GithubController {
    constructor(@inject(DI.GITHUB_SERVICE) private service: GithubService) {}

    @httpGet('/repos')
    public repos(): Promise<Repository[]> {
        return this.service.getRepos()
    }

    @httpGet('/generalInfo/:nameId')
    public async generalInfo(
        @requestParam('nameId') nameId: string
    ): Promise<GeneralInfo> {
        try {
            const readme = await this.service.getRepoObject(nameId, 'README.md')
            const pkg = await this.service.getRepoObject(nameId, 'package.json')

            return Promise.resolve({ readme, pkg })
        } catch (e) {
            return Promise.reject(e)
        }
    }

    @httpGet('/commits/:nameId')
    public commits(@requestParam('nameId') nameId: string): Promise<Commit[]> {
        return this.service.getCommits(nameId)
    }

    @httpGet('/commits/:nameId/:commitId')
    public async patch(
        @requestParam('nameId') nameId: string,
        @requestParam('commitId') commitId: string,
        @response() res: Response
    ) {
        try {
            const result = await this.service.getCommitPatch(nameId, commitId)

            res.attachment(`${nameId}-${commitId}.patch`)
            res.type('patch')
            res.send(result)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}
