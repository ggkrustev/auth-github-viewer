import rp from 'request-promise'
import { inject, injectable } from 'inversify'
import { GraphQLClient } from 'graphql-request'
import { CommitPatchService } from '../services/commit-patch.service'
import { Repository } from '../models/repository'
import { Commit } from '../models/commit'
import DI from '../di'

import { commitsQuery, reposQuery, repoObjectQuery } from '../graphql/queries'
import { mapToCommit, mapToRepos, mapObjectToText } from '../graphql/mappings'
import { CacheService } from './cache.service';

@injectable()
export class GithubService {
    constructor(
        @inject(DI.CACHE_SERVICE) private cache: CacheService,
        @inject(DI.GRAPHQL_CLIENT) private client: GraphQLClient,
        @inject(DI.GITHUB_COMMIT_PATCH) private patchService: CommitPatchService
    ) {}

    public getRepos(): Promise<Repository[]> {
        const fetchAsync = () => {
            return this.client
                .request(reposQuery())
                .then((data: any) => (
                    mapToRepos(
                        data.organization.pinnedRepositories
                            .edges
                    ) // TODO: pass just `data`
                ));
        }

        return this.cache.get('repos', fetchAsync);
    }

    public getRepoObject(nameId: string, objectName: string): Promise<string> {
        const fetchAsync = () => (
            this.client
                .request(repoObjectQuery(nameId, objectName))
                .then((data: any) => mapObjectToText(data))
        )
        return this.cache.get(`${nameId}-${objectName}`, fetchAsync);
    }

    public getCommits(nameId: string): Promise<Commit[]> {
        const fetchAsync = () => (
            this.client
                .request(commitsQuery(nameId))
                .then((data: any) => mapToCommit(data))
        );
        return this.cache.get(`${nameId}-master-commits`, fetchAsync);
    }

    public getCommitPatch(nameId: string, commitId: string): Promise<string> {
        return this.patchService.getPatch(nameId, commitId)
    }
}
