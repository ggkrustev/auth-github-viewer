import { Container } from 'inversify'
import { GraphQLClient } from 'graphql-request'
import config from 'config'
import DI from './di'

import { GithubConfig, ServerConfig } from './config/interfaces'
import { CommitPatchService } from './services/commit-patch.service'
import { GithubService } from './services/github.service'

const container = new Container()

// Configuration
container.bind<GithubConfig>(DI.GITHUB_CONFIG).toConstantValue({
    token: config.get('github.token'),
    apiUrl: config.get('github.apiUrl'),
    organizationUrl: config.get('github.organizationUrl')
});

container.bind<ServerConfig>(DI.SERVER_CONFIG).toConstantValue({
    port: config.get('server.port')
});

// Services
container.bind<GraphQLClient>(DI.GRAPHQL_CLIENT)
         .toDynamicValue(
           (context) => {
              const githubConfig = context.container.get<GithubConfig>(DI.GITHUB_CONFIG);
              const { apiUrl, token } = githubConfig;

              return new GraphQLClient(apiUrl, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
           }
         );

container.bind<CommitPatchService>(DI.GITHUB_COMMIT_PATCH).to(CommitPatchService);
container.bind<GithubService>(DI.GITHUB_SERVICE).to(GithubService);


export default container

