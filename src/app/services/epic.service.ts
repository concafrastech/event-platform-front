import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Epic} from '../models/epic';

@Injectable()
export class EpicService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addEpic(token, epic): Observable<any> {
        let params = JSON.stringify(epic);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'epic', params, {headers: headers});
    }

    updateEpic(token, epic: Epic): Observable<any> {
        let params = JSON.stringify(epic);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.put(this.url + 'epics/' + epic._id, params, {headers: headers});
    }

    getEpics(token, page = null): Observable<any> {
        let params = { page : page };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url + 'epics/', {headers: headers, params: params});
    }

    getEpic(token, id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url + 'epics/' + id, {headers: headers});
    }

    deleteEpic(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.delete(this.url + 'epics/' + id, {headers: headers});
    }
}
