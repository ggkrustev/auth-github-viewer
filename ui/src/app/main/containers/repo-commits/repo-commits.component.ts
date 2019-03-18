import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepoService } from '../../services/repo.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { CommitModel } from '../../models/commit.model';
import { config } from '../../../config';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DataSourceModel } from '../../models/datasource.model';

@Component({
  selector: 'app-repo-commits',
  templateUrl: './repo-commits.component.html',
  styleUrls: ['./repo-commits.component.scss']
})
export class RepoCommitsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  // TODO: register as provider
  public apiUrl: string = config.apiUrl;

  public repoName: string;
  public commits: CommitModel[];
  public total: number;
  public loading = true;

  public modal: { title: string, content: string };
  public showModal = false;

  constructor(
    private authService: AuthService,
    private repoService: RepoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO: move nameId to @Input property
    this.route.params
      .pipe(
        map(params => params.nameId),
        take(1)
      )
      .subscribe(nameId => {
        this.repoName = nameId;
        this.fetch(nameId);
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

  public refresh(state: ClrDatagridStateInterface<DataSourceModel<CommitModel>>) {
    this.loading = true;
    this.fetch(this.repoName, state);
  }

  private fetch(repoName, state?: ClrDatagridStateInterface<DataSourceModel<CommitModel>>) {
    if (!repoName) { return; }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.repoService.repoCommits(repoName, state)
      .subscribe(
        (model) => {
          this.loading = false;
          this.commits = model.data;
          this.total = model.total;
        },
        (error) => {
          this.showModal = true;
          this.modal = {
            title: `Oops! ${error.statusText}`,
            content: error.message
          };
        }
      );
  }
}
