import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Activity} from '../models/activity';
import { getToken } from '../utils/token';

@Injectable()
export class ActivityService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addActivity(activity): Observable<any> {
        let params = JSON.stringify(activity);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());
        
        return this._http.post(this.url + 'activities', params, {headers: headers});
    }

    updateActivity(activity: Activity): Observable<any> {
        let params = JSON.stringify(activity);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'activities/' + activity._id, params, {headers: headers});
    }

    getActivities(page = null, stageId = null): Observable<any> {
        let params = { 
            page : page,
            stage : stageId != null ? stageId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'activities/', {headers: headers, params: params});
    }

    getActivity(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'activities/' + id, {headers: headers});
    }

    deleteActivity(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'activities/' + id, {headers: headers});
    }
}
