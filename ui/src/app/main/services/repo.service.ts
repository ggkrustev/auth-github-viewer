import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { DataSourceModel } from '../models/datasource.model';
import { RepoModel } from '../models/repo.model';
import { CommitModel } from '../models/commit.model';
import { GeneralInfoModel } from '../models/general-info.model';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as qs from 'qs';

@Injectable()
export class RepoService {
  constructor(private http: HttpClient) {}

  repos(state?: ClrDatagridStateInterface<RepoModel>): Observable<RepoModel[]> {
    const params = this.getParams(state);
    return this.http.get<RepoModel[]>(`${config.apiUrl}/api/repos`, { params });
  }

  repoInfo(nameId: string): Observable<GeneralInfoModel> {
    return this.http.get<GeneralInfoModel>(
      `${config.apiUrl}/api/generalInfo/${nameId}`
    );
  }

  repoCommits(nameId: string, state?: ClrDatagridStateInterface<DataSourceModel<CommitModel>>): Observable<DataSourceModel<CommitModel>> {
    const params = this.getParams(state);

    return this.http.get<DataSourceModel<CommitModel>>(`${config.apiUrl}/api/commits/${nameId}`, { params });
  }

  private getParams<T>(state?: ClrDatagridStateInterface<T>): HttpParams {
    const params = new HttpParams();
    if (!state) { return params; }

    const reducer = (p: HttpParams, descritorName: string) => {
      if (! state[descritorName]) {
        return p;
      }

      return p.append(descritorName, qs.stringify(state[descritorName]));
    };

    return ['filters', 'page', 'sort'].reduce(reducer, params);
  }
}
