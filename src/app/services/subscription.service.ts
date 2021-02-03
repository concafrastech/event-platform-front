import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Subscription} from '../models/subscription';
import { getToken } from '../utils/token';

@Injectable()
export class SubscriptionService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addSubscription(subscription): Observable<any> {
        let params = JSON.stringify(subscription);
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());
        
        return this._http.post(this.url + 'subscriptions', params, {headers: headers});
    }

    updateSubscription(subscription: Subscription): Observable<any> {
        let params = JSON.stringify(subscription);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.put(this.url + 'subscriptions/' + subscription._id, params, {headers: headers});
    }

    getSubscriptions(page = null, userId = null): Observable<any> {
        let params = { 
            page : page,
            user : userId != null ? userId : ''
         };
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'subscriptions/', {headers: headers, params: params});
    }

    getSubscription(id): Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', getToken());

        return this._http.get(this.url + 'subscriptions/' + id, {headers: headers});
    }

    deleteSubscription(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', getToken());

        return this._http.delete(this.url + 'subscriptions/' + id, {headers: headers});
    }
}
