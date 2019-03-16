import { inject, injectable } from 'inversify'
import { GraphQLClient } from 'graphql-request'
import { Repository } from '../models/repository'
import DI from '../di'

import { commitsQuery, reposQuery, repoObjectQuery } from '../graphql/queries'
import { mapToRepos, mapObjectToText } from '../graphql/mappings'

@injectable()
export class GithubService {
    constructor(@inject(DI.GRAPHQL_CLIENT) private client: GraphQLClient) {}

    public getRepos(): Promise<Repository[]> {
        return new Promise((resolve, reject) => {
            this.client
                .request(reposQuery())
                .then((data: any) =>
                    resolve(
                        mapToRepos(data.organization.pinnedRepositories.edges)
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
}
