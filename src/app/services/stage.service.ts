import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Stage} from '../models/stage';
import { getToken } from '../utils/token';

@Injectable()
export class StageService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addStage(stage): Observable<any> {
        let params = JSON.stringify(stage);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.post(this.url + 'stages', params, {headers: headers});
    }

    updateStage(stage: Stage): Observable<any> {
        let params = JSON.stringify(stage);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'stages/' + stage._id, params, {headers: headers});
    }

    getStages(page = null, epicId = null): Observable<any> {
        let params = { 
            page : page,
            epic : epicId != null ? epicId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'stages/', {headers: headers, params: params});
    }

    getStage(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'stages/' + id, {headers: headers});
    }

    deleteStage(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'stages/' + id, {headers: headers});
    }
}
