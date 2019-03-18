import * as qs from 'qs';
import { inject } from 'inversify'
import { Response } from 'express'
import { LoggerInstance } from 'winston'
import {
    controller,
    httpGet,
    response,
    requestParam,
    queryParam,
} from 'inversify-express-utils'
import { GithubService } from '../services/github.service'
import { FilterDescriptor } from '../models/filter-descritor'
import { GeneralInfo } from '../models/general-info'
import { Repository } from '../models/repository'
import { Commit } from '../models/commit'
import DI from '../di'

const identity = (v: any): any => v;
const toNumber = (value?: string): number => {
    const n = Number(value);
    return isNaN(n) ? -Infinity : n;
};
const toArray = (filters: {[x: string]: FilterDescriptor}): FilterDescriptor[] => {
    return Object.keys(filters).map(key => filters[key]);
}

const contains = (value?: string, search?: string): boolean => {
    if (!value || !search) { return false; }
    return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
}

const equal = (value?: number, search?: number): boolean => {
    if (!value || !search) { return false; }
    return value === search;
}

const repositoryTransformers = {
   'name': [identity, contains],
   'license': [identity, contains],
   'branches': [toNumber, equal],
   'commits': [toNumber, equal],
   'releases': [toNumber, equal],
   'contributors': [toNumber, equal]
} as any;

type FilterComparer = (instance: any) => boolean;
const buildFilterPredicate = (filters: FilterDescriptor[]): FilterComparer[] => {
    return filters.map((f: FilterDescriptor) => {
        const [parse, compare] = repositoryTransformers[f.property];
        return (instance: any): boolean => compare(instance[f.property], parse(f.value));
    });
}

@controller('/api')
export class GithubController {
    constructor(
        @inject(DI.GITHUB_SERVICE) private service: GithubService,
        @inject(DI.LOGGER_INSTANCE) private logger: LoggerInstance
    ) {}

    @httpGet('/repos', DI.AUTH_MIDDLEWARE)
    public async repos(
        @queryParam('filters') filters: string = ''
    ): Promise<Repository[]> {
        try {
            const repos = await this.service.getRepos();
            const filterPredicates = buildFilterPredicate(toArray(qs.parse(filters)));

            if (!filterPredicates.length) {
                return Promise.resolve(repos);
            }

            const reduced = repos.filter((repo) => {
                return filterPredicates.reduce((state, filter) => {
                    return state || filter(repo);
                }, false);
            });

            return Promise.resolve(reduced);
        } catch (err) {
            this.logger.error('/github/repos failed', { error: err })
            return Promise.reject(err)
        }
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
