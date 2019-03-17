import { Component, OnInit } from '@angular/core';
import { RepoModel } from '../../models/repo.model';
import { RepoService } from '../../services/repo.service';
import {
  NameFilter,
  LicenseFilter,
  CommitFilter,
  ContributorFilter,
  ReleaseFilter,
  BranchFilter
} from './grid-filters';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  public repos: RepoModel[] = [];
  public nameFilter = new NameFilter();
  public licenseFilter = new LicenseFilter();
  public commitFilter = new CommitFilter();
  public contributorFilter = new ContributorFilter();
  public releaseFilter = new ReleaseFilter();
  public branchFilter = new BranchFilter();

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.repoService.repos().subscribe(repos => (this.repos = repos));
  }
}
