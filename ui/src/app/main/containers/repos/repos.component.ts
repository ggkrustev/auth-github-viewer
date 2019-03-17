import { Component, OnInit } from '@angular/core';
import { RepoModel } from '../../models/repo.model';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  public repos: RepoModel[] = [];

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.repoService.repos().subscribe(repos => (this.repos = repos));
  }
}
