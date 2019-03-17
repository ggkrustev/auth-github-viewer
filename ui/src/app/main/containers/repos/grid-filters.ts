import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { RepoModel } from '../../models/repo.model';

const compareAsNumbers = (modelValue: number, search: string): boolean => {
      const value = Number(search);
      return !isNaN(value) && modelValue === value;
};

export class NameFilter implements ClrDatagridStringFilterInterface<RepoModel> {
    accepts(repo: RepoModel, search: string): boolean {
      return repo.name.toLowerCase().indexOf(search) >= 0;
    }
}

export class LicenseFilter implements ClrDatagridStringFilterInterface<RepoModel> {
    accepts(repo: RepoModel, search: string): boolean {
      return repo.license.toLowerCase().indexOf(search) >= 0;
    }
}

export class CommitFilter implements ClrDatagridStringFilterInterface<RepoModel> {
    accepts(repo: RepoModel, search: string): boolean {
      return compareAsNumbers(repo.commits, search);
    }
}

export class ContributorFilter implements ClrDatagridStringFilterInterface<RepoModel> {
    accepts(repo: RepoModel, search: string): boolean {
      return compareAsNumbers(repo.contributors, search);
    }
}

export class ReleaseFilter implements ClrDatagridStringFilterInterface<RepoModel> {
    accepts(repo: RepoModel, search: string): boolean {
      return compareAsNumbers(repo.releases, search);
    }
}

export class BranchFilter implements ClrDatagridStringFilterInterface<RepoModel> {
    accepts(repo: RepoModel, search: string): boolean {
      return compareAsNumbers(repo.branches, search);
    }
}