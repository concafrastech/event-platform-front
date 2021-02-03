import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Xps } from '../models/xps';
import { getToken } from '../utils/token';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class XpsService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addXp(xp): Observable<any> {
    let params = JSON.stringify(xp);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.post(this.url + "xps", params, { headers: headers });
  }

  updateXp(xp: Xps): Observable<any> {
    let params = JSON.stringify(xp);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.put(this.url + "xps/" + xp._id, params, {
      headers: headers,
    });
  }

  getXps(page = null): Observable<any> {
    let params = {
      page: page,
    };
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.get(this.url + "xps/", {
      headers: headers,
      params: params,
    });
  }

  getXp(id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.get(this.url + "xps/" + id, { headers: headers });
  }

  getXpByUser(idUser: string): Observable<any>{
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.get(this.url + "xps/" + idUser, { headers: headers });
  }

  deleteXp(id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.delete(this.url + "xps/" + id, { headers: headers });
  }
}
