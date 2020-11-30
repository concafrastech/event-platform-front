import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Document} from '../models/document';
import { getToken } from '../utils/token';

@Injectable()
export class DocumentService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addDocument(document): Observable<any> {
        let params = JSON.stringify(document);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.post(this.url + 'documents', params, {headers: headers});
    }

    updateDocument(document: Document): Observable<any> {
        let params = JSON.stringify(document);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'documents/' + document._id, params, {headers: headers});
    }

    getDocuments(page = null, conferenceId = null): Observable<any> {
        let params = { 
            page : page,
            conference : conferenceId != null ? conferenceId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'documents/', {headers: headers, params: params});
    }

    getDocument(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'documents/' + id, {headers: headers});
    }

    deleteDocument(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'documents/' + id, {headers: headers});
    }
}
