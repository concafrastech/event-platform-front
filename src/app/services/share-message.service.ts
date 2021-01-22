import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareMessage } from '../models/share-message';
import { getToken } from '../utils/token';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ShareMessageService {

  public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addShareMessage(message: ShareMessage): Observable<any> {
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());
        
        return this._http.post(this.url + 'share-messages', params, {headers: headers});
    }

    getRecentShareMessages(page = null): Observable<any> {
        let params = { 
            page : page,
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'share-messages/', {headers: headers, params: params});
    }

    getFullShareMessages(page = null): Observable<any> {
        let params = { 
            page : page,
            full : '1',
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'share-messages/', {headers: headers, params: params});
    }

}
