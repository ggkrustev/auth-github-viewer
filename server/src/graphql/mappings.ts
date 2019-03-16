import { Repository } from '../models/repository'

// TODO: beautify the hasValue impl
const hasValue = (current: { [x: string]: any }, prop: string): boolean =>
    current[prop] !== null && current[prop] !== undefined

// TODO: beautify the safeGet impl
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

export const mapToRepos = (nodes: any[]): Repository[] =>
    nodes.map((x) => {
        const node = getNode(x)
        return {
            name: getName(node),
            branches: getBranches(node),
            commits: getCommits(node),
            license: getLicense(node),
            releases: getReleases(node),
        } as Repository
    })
