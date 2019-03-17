import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepoService } from '../../services/repo.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { CommitModel } from '../../models/commit.model';
import { config } from '../../../config';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-repo-commits',
  templateUrl: './repo-commits.component.html',
  styleUrls: ['./repo-commits.component.scss']
})
export class RepoCommitsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  // TODO: register as provider
  public apiUrl: string = config.apiUrl;
  public commits: CommitModel[];
  public repoName: string;

  constructor(
    private authService: AuthService,
    private repoService: RepoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO: move nameId to @Input property
    this.subscription = this.route.params
      .pipe(
        map(params => params.nameId),
        tap(nameId => (this.repoName = nameId)),
        switchMap(nameId => this.repoService.repoCommits(nameId))
      )
      .subscribe(commits => {
        this.commits = commits;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toDate(dateString: string): string {
    const date = new Date(dateString);
    return date
      ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      : '';
  }

  public toPatchUrl(commit: CommitModel): string {
    return `${this.apiUrl}/api/commits/${this.repoName}/${
      commit.id
    }?access_token=${this.authService.getJwtToken()}`;
  }
}
