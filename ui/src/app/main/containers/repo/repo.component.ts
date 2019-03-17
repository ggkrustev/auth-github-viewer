import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralInfoModel } from '../../models/general-info.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public repoName: string;
  public repoInfo: GeneralInfoModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  alert() {
    alert('WTF');
  }
  ngOnInit() {
    this.subscription = this.route.params
      .pipe(map(params => params.nameId))
      .subscribe((nameId: string) => this.repoName = nameId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public goBack() {
    this.router.navigate(['/main']);
  }
}
