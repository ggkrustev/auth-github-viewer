import rp from 'request-promise'
import { inject, injectable } from 'inversify'
import { GithubConfig } from '../config/interfaces'
import DI from '../di'

@injectable()
export class CommitPatchService {
    constructor(@inject(DI.GITHUB_CONFIG) private config: GithubConfig) {}

    public getPatch(nameId: string, commitId: string): Promise<string> {
        // XXX: http://tiny.cc/w4w53y
        // XXX: Fallback to /:repo/commit/:sha.patch url to get the patch
        const patchUrl = `${
            this.config.organizationUrl
        }/${nameId}/commit/${commitId}.patch`

        return new Promise((resolve, reject) => {
            rp(patchUrl)
                .then((patch) => resolve(patch))
                .catch((err) => reject(err))
        })
    }
}
