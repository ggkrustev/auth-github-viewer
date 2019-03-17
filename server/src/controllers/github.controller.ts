import { inject } from 'inversify'
import { Response } from 'express'
import { LoggerInstance } from 'winston'
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
    constructor(
        @inject(DI.GITHUB_SERVICE) private service: GithubService,
        @inject(DI.LOGGER_INSTANCE) private logger: LoggerInstance
    ) {}

    @httpGet('/repos', DI.AUTH_MIDDLEWARE)
    public repos(): Promise<Repository[]> {
        return this.service.getRepos()
    }

    @httpGet('/generalInfo/:nameId', DI.AUTH_MIDDLEWARE)
    public async generalInfo(
        @requestParam('nameId') nameId: string
    ): Promise<GeneralInfo> {
        try {
            this.logger.info('[Fetch github general info]', { nameId })

            const readme = await this.service.getRepoObject(nameId, 'README.md')
            const pkg = await this.service.getRepoObject(nameId, 'package.json')

            return Promise.resolve({ readme, pkg })
        } catch (err) {
            this.logger.error('/github/generalInfo failed', { error: err })
            return Promise.reject(err)
        }
    }

    @httpGet('/commits/:nameId', DI.AUTH_MIDDLEWARE)
    public commits(@requestParam('nameId') nameId: string): Promise<Commit[]> {
        this.logger.info('[Fetch commits]', { nameId })

        return this.service.getCommits(nameId)
    }

    @httpGet('/commits/:nameId/:commitId', DI.AUTH_MIDDLEWARE)
    public async patch(
        @requestParam('nameId') nameId: string,
        @requestParam('commitId') commitId: string,
        @response() res: Response
    ) {
        try {
            this.logger.info('[Create commit patch]', { nameId, commitId })
            const result = await this.service.getCommitPatch(nameId, commitId)

            res.attachment(`${nameId}-${commitId}.patch`)
            res.type('patch')
            res.send(result)
        } catch (err) {
            this.logger.error('[Create commit patch]', { nameId, commitId })
            res.status(400).json({ error: err.message })
        }
    }
}
