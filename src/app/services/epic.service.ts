import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Epic} from '../models/epic';
import { getToken } from '../utils/token';

@Injectable()
export class EpicService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addEpic(epic): Observable<any> {
        let params = JSON.stringify(epic);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.post(this.url + 'epics', params, {headers: headers});
    }

    updateEpic(epic: Epic): Observable<any> {
        let params = JSON.stringify(epic);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'epics/' + epic._id, params, {headers: headers});
    }

    getEpics(page = null, conferenceId = null): Observable<any> {
        let params = { 
            page : page,
            conference : conferenceId != null ? conferenceId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'epics/', {headers: headers, params: params});
    }

    getSchedules(epicId = null, userId = null): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'epics/' + epicId + '/schedule/' + userId, {headers: headers});
    }

    getEpic(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'epics/' + id, {headers: headers});
    }

    deleteEpic(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'epics/' + id, {headers: headers});
    }
}
