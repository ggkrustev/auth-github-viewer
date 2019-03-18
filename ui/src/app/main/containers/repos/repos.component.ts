import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filters } from '../../models/filters.model';
import { RepoModel } from '../../models/repo.model';
import { RepoService } from '../../services/repo.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit, OnDestroy {
  public repos: RepoModel[] = [];
  public subscription: Subscription;
  public loading = true;

  public modal: { title: string, content: string };
  public showModal = false;

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.fetch();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refresh(state: ClrDatagridStateInterface<RepoModel>) {
    this.loading = true;
    this.fetch(state);
  }

  private fetch(state?: ClrDatagridStateInterface<RepoModel>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.repoService.repos(state)
      .subscribe(
        (repos) => {
          this.loading = false;
          this.repos = repos;
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
