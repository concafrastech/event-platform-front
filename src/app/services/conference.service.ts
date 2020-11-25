import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Conference} from '../models/conference';
import { getToken } from '../utils/token';

@Injectable()
export class ConferenceService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addConference(conference): Observable<any> {
        let params = JSON.stringify(conference);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.post(this.url + 'conferences', params, {headers: headers});
    }

    updateConference(conference: Conference): Observable<any> {
        let params = JSON.stringify(conference);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'conferences/' + conference._id, params, {headers: headers});
    }

    getConferences(page = null): Observable<any> {
        let params = { page : page };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'conferences/', {headers: headers, params: params});
    }

    getConference(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'conferences/' + id, {headers: headers});
    }

    deleteConference(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken() );

        return this._http.delete(this.url + 'conferences/' + id, {headers: headers});
    }
}
