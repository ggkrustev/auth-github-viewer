import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ReposComponent } from './containers/repos/repos.component';
import { RepoInfoComponent } from './containers/repo-info/repo-info.component';
import { RepoCommitsComponent } from './containers/repo-commits/repo-commits.component';
import { RepoService } from './services/repo.service';
import { ClarityModule } from '@clr/angular';
import { JsonViewerComponent } from './components/json-viewer.component';
import { MarkDownViewerComponent } from './components/md-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: ReposComponent },
      { path: 'repo/info/:nameId', component: RepoInfoComponent },
      { path: 'repo/commits/:nameId', component: RepoCommitsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ClarityModule, CommonModule],
  exports: [RouterModule, ClarityModule],
  declarations: [
    ReposComponent,
    RepoInfoComponent,
    RepoCommitsComponent,
    JsonViewerComponent,
    MarkDownViewerComponent
  ],
  providers: [RepoService]
})
export class MainRoutingModule {}
