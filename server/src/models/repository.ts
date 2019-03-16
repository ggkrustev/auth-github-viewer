export interface Repository {
    name: string
    license: string
    branches: number
    commits: number
    releases: number
    /**
     * Github requires push rights to get contributors
     * TODO: make it non-nullable once data can be fetched
     */
    contributors?: number
}
