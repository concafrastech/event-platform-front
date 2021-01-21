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
        
        return this._http.post(this.url + 'activities', params, {headers: headers});
    }

    updateShareMessage(message: ShareMessage): Observable<any> {
        let params = JSON.stringify(message);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'activities/' + message._id, params, {headers: headers});
    }

    getRecentMessages(page = null, stageId = null): Observable<any> {
        let params = { 
            page : page,
            stage : stageId != null ? stageId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'activities/', {headers: headers, params: params});
    }

    getShareMessage(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'activities/' + id, {headers: headers});
    }

    deleteShareMessage(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'activities/' + id, {headers: headers});
    }
}
