export default {
    AUTH_CONFIG: Symbol.for('AuthConfig'),
    CACHE_CONFIG: Symbol.for('CacheConfig'),
    GITHUB_CONFIG: Symbol.for('GithubConfig'),
    SERVER_CONFIG: Symbol.for('ServerConfig'),

    AUTH_MIDDLEWARE: Symbol.for('AuthMiddleware'),

    AUTH_SERVICE: Symbol.for('AuthService'),
    CACHE_SERVICE: Symbol.for('CacheService'),
    GRAPHQL_CLIENT: Symbol.for('GraphQLClient'),
    GITHUB_SERVICE: Symbol.for('GithubService'),
    GITHUB_COMMIT_PATCH: Symbol.for('GithubCommitPatch'),

    LOGGER_INSTANCE: Symbol('LOGGER_INSTANCE'),
}
