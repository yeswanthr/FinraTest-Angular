import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {PageAttributes} from '../models/PageAttributes';


@Injectable({
  providedIn: 'root'
})
export class GridServiceService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  getInitialData(input: number | string = 1234567): Observable<HttpResponse<PageAttributes>>{
    console.log('in service');
    return this.httpClient.get<HttpResponse<PageAttributes>>(AppConstants.BASE_URL
      + AppConstants.GENERATE_COMBINATIONS + `/${input}`, this.httpOptions);
    }

  getGridData(pageNumber: any) {
    pageNumber = parseInt(pageNumber);
    console.log('in service', pageNumber);
    return this.httpClient.get(AppConstants.BASE_URL + AppConstants.GET_COMBINATIONS + `/${pageNumber}`, this.httpOptions);
  }

}
