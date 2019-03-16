export interface ServerConfig {
    port: number
}

export interface GithubConfig {
    token: string
    apiUrl: string
    organizationUrl: string
}

export interface AuthConfig {
    algorithm: string
    audience: string
    expiresIn: string
    issuer: string
    subject: string
    secret: string
    public: string
}
