import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './global';
import { getToken } from '../utils/token';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
    public url: string;

  constructor(private http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  getChatByRoom(room) : Observable<any> {
    let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", getToken());

    return this.http.get(this.url + 'chat/?room=' + room, {
        headers: headers
      });
  }

  saveChat(data) : Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", getToken());

    return this.http.post(this.url + 'chat/', params, {
        headers: headers,
    });
  }

  showChat(id) {
    let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", getToken());

    return this.http.get('/chat/' + id, {
        headers: headers
      });
  }

  updateChat(id, data) {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", getToken());

    return this.http.put(this.url + 'chat/' + id, params, {
        headers: headers,
    });
  }

  deleteChat(id) {
    let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", getToken());

    return this.http.delete('/chat/' + id, {
        headers: headers
      });
  }

}