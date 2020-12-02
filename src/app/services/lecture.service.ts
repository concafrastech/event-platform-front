import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Lecture} from '../models/lecture';
import { getToken } from '../utils/token';

@Injectable()
export class LectureService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addLecture(lecture): Observable<any> {
        let params = JSON.stringify(lecture);
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());
        
        return this._http.post(this.url + 'lectures', params, {headers: headers});
    }

    updateLecture(lecture: Lecture): Observable<any> {
        let params = JSON.stringify(lecture);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'lectures/' + lecture._id, params, {headers: headers});
    }

    getLectures(page = null, conferenceId = null): Observable<any> {
        let params = { 
            page : page,
            conference : conferenceId != null ? conferenceId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'lectures/', {headers: headers, params: params});
    }

    getLecture(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'lectures/' + id, {headers: headers});
    }

    deleteLecture(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'lectures/' + id, {headers: headers});
    }
}
