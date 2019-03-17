import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { RepoModel } from '../models/repo.model';
import { CommitModel } from '../models/commit.model';
import { GeneralInfoModel } from '../models/general-info.model';

@Injectable()
export class RepoService {
  constructor(private http: HttpClient) {}

  repos(): Observable<RepoModel[]> {
    return this.http.get<RepoModel[]>(`${config.apiUrl}/api/repos`);
  }

  repoInfo(nameId: string): Observable<GeneralInfoModel> {
    return this.http.get<GeneralInfoModel>(
      `${config.apiUrl}/api/generalInfo/${nameId}`
    );
  }

  repoCommits(nameId: string): Observable<CommitModel[]> {
    return this.http.get<CommitModel[]>(
      `${config.apiUrl}/api/commits/${nameId}`
    );
  }
}
