export default {
    AUTH_CONFIG: Symbol.for('AuthConfig'),
    GITHUB_CONFIG: Symbol.for('GithubConfig'),
    SERVER_CONFIG: Symbol.for('ServerConfig'),

    AUTH_MIDDLEWARE: Symbol.for('AuthMiddleware'),

    AUTH_SERVICE: Symbol.for('AuthService'),
    GRAPHQL_CLIENT: Symbol.for('GraphQLClient'),
    GITHUB_SERVICE: Symbol.for('GithubService'),
    GITHUB_COMMIT_PATCH: Symbol.for('GithubCommitPatch'),

    LOGGER_INSTANCE: Symbol('LOGGER_INSTANCE'),
}
