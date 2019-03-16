import rp from 'request-promise'
import { inject, injectable } from 'inversify'
import { GraphQLClient } from 'graphql-request'
import { GithubConfig } from '../config/interfaces'
import { CommitPatchService } from '../services/commit-patch.service'
import { Repository } from '../models/repository'
import { Commit } from '../models/commit'
import DI from '../di'

import { commitsQuery, reposQuery, repoObjectQuery } from '../graphql/queries'
import { mapToCommit, mapToRepos, mapObjectToText } from '../graphql/mappings'

@injectable()
export class GithubService {
    constructor(
        @inject(DI.GRAPHQL_CLIENT) private client: GraphQLClient,
        @inject(DI.GITHUB_COMMIT_PATCH) private patchService: CommitPatchService
    ) {}

    public getRepos(): Promise<Repository[]> {
        return new Promise((resolve, reject) => {
            this.client
                .request(reposQuery())
                .then((data: any) =>
                    resolve(
                        mapToRepos(
                            data.organization.pinnedRepositories
                                .edges
                        ) // TODO: pass just `data`
                    )
                )
                .catch((err) => reject(err))
        })
    }

    public getRepoObject(nameId: string, objectName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client
                .request(repoObjectQuery(nameId, objectName))
                .then((data: any) => resolve(mapObjectToText(data)))
                .catch((err) => reject(err))
        })
    }

    public getCommits(nameId: string): Promise<Commit[]> {
        return new Promise((resolve, reject) => {
            this.client
                .request(commitsQuery(nameId))
                .then((data: any) => resolve(mapToCommit(data)))
                .catch((err) => reject(err))
        })
    }

    public getCommitPatch(nameId: string, commitId: string): Promise<string> {
        return this.patchService.getPatch(nameId, commitId)
    }
}
