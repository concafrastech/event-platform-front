import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Trail} from '../models/trail';
import { getToken } from '../utils/token';

@Injectable()
export class TrailService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addTrail(trail): Observable<any> {
        let params = JSON.stringify(trail);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.post(this.url + 'trails', params, {headers: headers});
    }

    updateTrail(trail: Trail): Observable<any> {
        let params = JSON.stringify(trail);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'trails/' + trail._id, params, {headers: headers});
    }

    getTrails(page = null, epicId = null, search = null): Observable<any> {
        let params = { 
            page : page,
            epic : epicId != null ? epicId : '',
            search : search != null ? search : '',
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'trails/', {headers: headers, params: params});
    }

    getFullTrails(page = null, epicId = null): Observable<any> {
        let params = { 
            full : '1',
            page : page,
            epic : epicId != null ? epicId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'trails/', {headers: headers, params: params});
    }

    getTrail(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'trails/' + id, {headers: headers});
    }

    deleteTrail(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'trails/' + id, {headers: headers});
    }
}
