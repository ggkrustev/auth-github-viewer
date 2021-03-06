import { Commit } from '../models/commit'
import { Repository } from '../models/repository'

const hasValue = (current: { [x: string]: any }, prop: string): boolean =>
    current[prop] !== null && current[prop] !== undefined

const safeGet = <T>(properties: string[], empty: T) => (node: {
    [x: string]: any
}): T => {
    const valueReducer = (current: { [x: string]: any } | null, prop: string) =>
        current && hasValue(current, prop) ? current[prop] : null

    const value = properties.reduce(valueReducer, node)

    return (value !== null ? value : empty) as T
}

const getNode = safeGet<{ [x: string]: any }>(['node'], {})
const getName = safeGet<string>(['name'], '')
const getBranches = safeGet<number>(['refs', 'totalCount'], 0)
const getLicense = safeGet<string>(['licenseInfo', 'name'], '')
const getCommits = safeGet<number>(
    ['ref', 'target', 'history', 'totalCount'],
    0
)
const getReleases = safeGet<number>(['releases', 'totalCount'], 0)

export const mapToRepos = (edges: any[]): Repository[] =>
    edges.map((x) => {
        const node = getNode(x)
        return {
            name: getName(node),
            branches: getBranches(node),
            commits: getCommits(node),
            license: getLicense(node),
            releases: getReleases(node),
        } as Repository
    })

const getObjectText = safeGet<string>(['repository', 'object', 'text'], '')

export const mapObjectToText = (data: { [x: string]: any }): string =>
    getObjectText(data)

const getHistoryEdges = safeGet<any[]>(
    ['repository', 'ref', 'target', 'history', 'edges'],
    []
)
const getCommitId = safeGet<string>(['oid'], '')
const getCommitComment = safeGet<string>(['messageHeadline'], '')
const getCommitDate = safeGet<string>(['author', 'date'], '')
const getCommitContributor = safeGet<string>(['author', 'email'], '')

export const mapToCommit = (data: { [x: string]: any }): Commit[] => {
    const edges = getHistoryEdges(data)
    return edges.map((x) => {
        const node = getNode(x)
        return {
            id: getCommitId(node),
            contributor: getCommitContributor(node),
            comment: getCommitComment(node),
            date: getCommitDate(node),
        } as Commit
    })
}
