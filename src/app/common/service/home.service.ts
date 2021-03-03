// @ts-ignore
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  public getInfoList(params): Observable<any> {
    return this.http.get(`/Public/getAppList?action=${params}`);
  }
}
