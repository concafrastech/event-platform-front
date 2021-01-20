import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Mission} from '../models/mission';
import { getToken } from '../utils/token';

@Injectable()
export class MissionService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addMission(mission): Observable<any> {
        let params = JSON.stringify(mission);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.post(this.url + 'missions', params, {headers: headers});
    }

    updateMission(mission: Mission): Observable<any> {
        let params = JSON.stringify(mission);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'missions/' + mission._id, params, {headers: headers});
    }

    getMissions(page = null, epicId = null): Observable<any> {
        let params = { 
            page : page,
            epic : epicId != null ? epicId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'missions/', {headers: headers, params: params});
    }

    getMission(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'missions/' + id, {headers: headers});
    }

    deleteMission(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'missions/' + id, {headers: headers});
    }
}
