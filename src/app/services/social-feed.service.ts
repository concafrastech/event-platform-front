import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getToken } from '../utils/token';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class SocialFeedService {

  public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getSocialFeeds(page = null): Observable<any> {
        let params = { 
            page : page
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'social-feed/', {headers: headers, params: params});
    }
}