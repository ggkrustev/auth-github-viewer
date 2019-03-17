import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RepoService } from '../../services/repo.service';
import { GeneralInfoModel } from '../../models/general-info.model';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss']
})
export class RepoInfoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public repoName: string;
  public repoInfo: GeneralInfoModel;

  constructor(
    private repoService: RepoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TODO: move nameId to @Input property
    this.subscription = this.route.params
      .pipe(
        map(params => params.nameId),
        tap(nameId => (this.repoName = nameId)),
        switchMap(nameId => this.repoService.repoInfo(nameId))
      )
      .subscribe(info => {
        this.repoInfo = info;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public goBack() {
    this.router.navigate(['/main']);
  }
}
