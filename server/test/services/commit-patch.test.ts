import 'mocha'
import { stub } from 'sinon'
import { expect } from 'chai'
import { CommitPatchService } from '../../src/services/commit-patch.service';

/*
 * TODO: uncomment when mock correctly the `request-promise` import
 *
describe('CommitPatchService', async () => {
    const mockManager = ImportMock.mockClass(rpModule, 'rp');
    const expectedPatch = 'some patch';

    it('should return patch', async () => {
        const service = new CommitPatchService({ organizationUrl: 'some' } as any);

        const result = await service.getPatch('clarity', 'f324324');

        expect(result).to.equal(expectedPatch)
    })
})
*/
