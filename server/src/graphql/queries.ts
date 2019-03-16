
// TODO: extract static values as params
// XXX: collaborators cannot be retrieved without push rights
// collaborators(affiliation:ALL) {
//    totalCount
// }
//

/**
 * Query for fetching pinned repos of an organization
 * @returns GraphQL query
 */
export const reposQuery = () => `{
    organization(login: "vmware") {
        pinnedRepositories(first: 10) {
            edges {
				node {
					name
                    licenseInfo {
                      name
                    }
                    refs(refPrefix:"refs/heads/") {
                      totalCount
                    }
                    ref(qualifiedName: "master") {
                        target {
                          ... on Commit {
                            history {
                              totalCount
                            }
                          }
                        }
                    }
                    releases {
                      totalCount
                    }
				}
            }
		}
    }
}`;

/**
 * Query for fetching a repo file
 * @param {string} nameId Github repo name
 * @returns GraphQL query
 */
export const repoObjectQuery = (nameId: string, objectName: string) => `{
  repository(name: ${nameId}, owner: "vmware") {
    object(expression: "master:${objectName}") {
      ... on Blob {
        text
      }
    }
  }
}`;


// TODO: extract static values as params
/**
 * Query for fetching repo general information
 * @param {string} nameId Github repo name
 * @returns GraphQL query
 */
export const commitsQuery = (nameId: string) => `
{
    repository(name: ${nameId}, owner: "vmware") {
        ref(qualifiedName: "master") {
            target {
            ... on Commit {
                id
                history(first: 20) {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        node {
                            messageHeadline
                            oid
                            message
                        author {
                            name
                            email
                            date
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;
